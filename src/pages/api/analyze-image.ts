import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Configure the body parser to accept larger payloads for image data
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ImageAnalysisResult {
  description: string;
  objects: string[];
  text: string[];
  colors: string[];
  mood: string;
  context: string;
  suggestions: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({ 
        success: false, 
        error: 'No image data provided' 
      });
    }

    // Remove data URL prefix if present
    const base64Image = imageData.startsWith('data:') 
      ? imageData.split(',')[1] 
      : imageData;

    // Analyze image using OpenAI Vision
    const analysisPrompt = `
Please analyze this image and provide detailed information about:

1. **Description**: A clear, concise description of what you see in the image
2. **Objects**: List the main objects, items, or elements visible in the image
3. **Text**: Any text, signs, labels, or written content visible in the image
4. **Colors**: The dominant colors and color scheme of the image
5. **Mood**: The overall mood, atmosphere, or feeling conveyed by the image
6. **Context**: What this image might be used for or represent (e.g., business meeting, product photo, document, etc.)
7. **Suggestions**: Based on the image content, suggest potential workflow templates or business activities this might relate to

Respond in JSON format:
{
  "description": "Brief description of the image",
  "objects": ["object1", "object2", "object3"],
  "text": ["text1", "text2"],
  "colors": ["color1", "color2"],
  "mood": "mood description",
  "context": "context description",
  "suggestions": ["suggestion1", "suggestion2"]
}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that analyzes images and extracts relevant information. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: analysisPrompt
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.3,
    });

    const analysisResult = completion.choices[0]?.message?.content;
    
    if (!analysisResult) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to analyze image' 
      });
    }

    // Clean the response to extract JSON from markdown code blocks if present
    let cleanedResult = analysisResult.trim();
    if (cleanedResult.startsWith('```json')) {
      cleanedResult = cleanedResult.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (cleanedResult.startsWith('```')) {
      cleanedResult = cleanedResult.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    let parsedResult: ImageAnalysisResult;
    try {
      parsedResult = JSON.parse(cleanedResult);
    } catch (parseError) {
      console.error('Failed to parse analysis result:', parseError);
      console.error('Raw result:', analysisResult);
      console.error('Cleaned result:', cleanedResult);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to parse analysis result' 
      });
    }

    return res.status(200).json({
      success: true,
      analysis: parsedResult
    });

  } catch (error) {
    console.error('Error analyzing image:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to analyze image'
    });
  }
} 