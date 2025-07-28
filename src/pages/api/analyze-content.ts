import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { db } from '../../db';
import { templates } from '../../db/schema';

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
    const { imageAnalysis, transcript, content, type } = req.body;

    // Handle pitch analysis (new functionality)
    if (type === 'pitch' && content) {
      return await handlePitchAnalysis(content, res);
    }

    // Original template matching functionality
    if (!imageAnalysis && !transcript) {
      return res.status(400).json({ 
        success: false, 
        error: 'No image analysis or transcript data provided' 
      });
    }

    // Fetch templates from database
    const dbTemplates = await db.select({
      templateId: templates.templateId,
      name: templates.name,
      description: templates.description,
      tag: templates.tag
    }).from(templates);

    if (dbTemplates.length === 0) {
      return res.status(500).json({
        success: false,
        error: 'No templates found in database'
      });
    }

    // Prepare content for analysis
    let contentToAnalyze = '';
    
    if (transcript) {
      contentToAnalyze += `Voice input: "${transcript}"\n\n`;
    }
    
    if (imageAnalysis) {
      contentToAnalyze += `Image Analysis:
- Description: ${imageAnalysis.description}
- Objects: ${imageAnalysis.objects.join(', ')}
- Text: ${imageAnalysis.text.join(', ')}
- Colors: ${imageAnalysis.colors.join(', ')}
- Mood: ${imageAnalysis.mood}
- Context: ${imageAnalysis.context}
- Suggestions: ${imageAnalysis.suggestions.join(', ')}

`;
    }

    // Create template list for analysis
    const templateList = dbTemplates.map(t => 
      `- ${t.templateId}: ${t.name} - ${t.description} (Tag: ${t.tag})`
    ).join('\n');

    // Analyze content using OpenAI
    const analysisPrompt = `
You are an AI assistant that analyzes user content (image analysis and voice transcripts) to suggest relevant workflow templates.

Content to analyze:
${contentToAnalyze}

Available workflows:
${templateList}

Please analyze the content and:
1. Provide a brief analysis of what the user is trying to accomplish
2. Suggest the most relevant workflows with confidence scores (0-1)
3. Explain why each template is relevant

Respond in JSON format:
{
  "analysis": "Brief analysis of the content and user intent",
  "templates": [
    {
      "templateId": "template-id",
      "confidence": 0.85,
      "reasoning": "Why this template is relevant"
    }
  ]
}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that analyzes user content and suggests relevant workflow templates. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: analysisPrompt
        }
      ],
      temperature: 0.3,
    });

    const analysisResult = completion.choices[0]?.message?.content;
    
    if (!analysisResult) {
      throw new Error('No analysis result received');
    }

    // Parse the JSON response
    let parsedResult;
    try {
      parsedResult = JSON.parse(analysisResult);
    } catch (error) {
      console.error('Failed to parse analysis result:', error);
      // Fallback to basic analysis
      parsedResult = {
        analysis: 'Analyzing your content to find relevant workflows...',
        templates: []
      };
    }

    // Map the analysis results to our database template structure
    const suggestedTemplates = dbTemplates.map(template => {
      const suggestedTemplate = parsedResult.templates?.find(
        (t: { templateId: string; confidence: number }) => t.templateId === template.templateId
      );
      
      return {
        templateId: template.templateId,
        name: template.name,
        description: template.description,
        confidence: suggestedTemplate?.confidence || 0,
      };
    }).filter(template => template.confidence > 0.1)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3); // Return top 3 suggestions

    return res.status(200).json({
      success: true,
      analysis: parsedResult.analysis || 'Content analyzed successfully.',
      templates: suggestedTemplates
    });

  } catch (error) {
    console.error('Error analyzing content:', error);
    return res.status(500).json({
      success: false,
      error: 'Error analyzing content',
    });
  }
}

// New function to handle pitch analysis
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
- Tags should be relevant categories like "Tech", "AI", "Healthcare", "Sustainability", etc.
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
        tags: ['Innovation', 'Startup', 'Business', 'Opportunity']
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
      tags: ['Innovation', 'Startup', 'Business']
    };

    return res.status(200).json({
      success: true,
      suggestions: fallbackSuggestions
    });
  }
} 