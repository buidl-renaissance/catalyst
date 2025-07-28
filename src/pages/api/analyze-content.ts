import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Configure the body parser to accept larger payloads
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { content, type } = req.body;

    // Handle pitch analysis
    if (type === 'pitch' && content) {
      return await handlePitchAnalysis(content, res);
    }

    // If no valid request type, return error
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid request. Please provide content with type "pitch".' 
    });

  } catch (error) {
    console.error('Error analyzing content:', error);
    return res.status(500).json({
      success: false,
      error: 'Error analyzing content',
    });
  }
}

// Function to handle pitch analysis
async function handlePitchAnalysis(content: string, res: NextApiResponse) {
  try {
    const pitchAnalysisPrompt = `
You are an AI assistant specialized in analyzing pitch transcripts and creating compelling marketing content.

Analyze this pitch transcript and generate:
1. A catchy, professional title (max 60 characters)
2. A compelling summary that would attract collaborators and investors (100-200 words)
3. 3-5 relevant tags/categories

Pitch transcript:
"${content}"

Guidelines:
- Title should be engaging, clear, and professional
- Summary should highlight the problem, solution, and value proposition
- Choose tags from this standardized list when applicable:
  * 🌱 CleanTech (for environmental/sustainability tech)
  * 🎮 Gaming (for gaming/entertainment)
  * 🎨 Art (for creative/artistic projects)
  * 🤖 AI/ML (for artificial intelligence/machine learning)
  * 📚 Education (for learning/educational projects)
  * 🌊 Ocean (for marine/ocean-related projects)
  * 💸 Needs Funding (if the pitch mentions funding needs)
  * 🔥 Needs Dev (if the pitch mentions needing developers)
  * 🎨 Needs Design (if the pitch mentions needing designers)
- You can also suggest other relevant tags not in this list
- Focus on what would appeal to potential collaborators, investors, or partners

Respond in JSON format:
{
  "title": "Engaging pitch title",
  "summary": "Compelling summary that highlights key points and value proposition",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"]
}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a marketing expert who creates compelling pitch summaries and titles. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: pitchAnalysisPrompt
        }
      ],
      temperature: 0.7, // Slightly higher temperature for more creative titles
    });

    const analysisResult = completion.choices[0]?.message?.content;
    
    if (!analysisResult) {
      throw new Error('No pitch analysis result received');
    }

    // Parse the JSON response
    let parsedResult;
    try {
      parsedResult = JSON.parse(analysisResult);
    } catch (error) {
      console.error('Failed to parse pitch analysis result:', error);
      // Fallback suggestions
      const firstSentence = content.split(/[.!?]/)[0]?.trim();
      parsedResult = {
        title: firstSentence && firstSentence.length > 10 && firstSentence.length < 60 
          ? firstSentence 
          : 'Innovative Business Idea',
        summary: content.length > 200 
          ? content.substring(0, 197) + '...' 
          : content,
        tags: ['🤖 AI/ML', '💸 Needs Funding', 'Innovation']
      };
    }

    // Validate and clean the results
    const suggestions = {
      title: parsedResult.title?.substring(0, 60) || 'Untitled Pitch',
      summary: parsedResult.summary?.substring(0, 500) || content.substring(0, 200),
      tags: Array.isArray(parsedResult.tags) 
        ? parsedResult.tags.slice(0, 5) 
        : ['Innovation', 'Startup']
    };

    return res.status(200).json({
      success: true,
      suggestions
    });

  } catch (error) {
    console.error('Error analyzing pitch:', error);
    
    // Fallback response
    const firstSentence = content.split(/[.!?]/)[0]?.trim();
    const fallbackSuggestions = {
      title: firstSentence && firstSentence.length > 10 && firstSentence.length < 60 
        ? firstSentence 
        : 'Innovative Business Idea',
      summary: content.length > 200 
        ? content.substring(0, 197) + '...' 
        : content,
      tags: ['🤖 AI/ML', '💸 Needs Funding', 'Innovation']
    };

    return res.status(200).json({
      success: true,
      suggestions: fallbackSuggestions
    });
  }
} 