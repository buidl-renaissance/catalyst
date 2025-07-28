import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

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
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ 
        success: false, 
        error: 'Transcript is required' 
      });
    }

    const quote = await extractQuote(transcript);

    return res.status(200).json({
      success: true,
      quote
    });

  } catch (error) {
    console.error('Error extracting quote:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to extract quote'
    });
  }
}

async function extractQuote(transcript: string): Promise<string> {
  try {
    const quoteExtractionPrompt = `
You are an expert at identifying the most compelling and quotable moments from pitch transcripts.

Analyze this pitch transcript and extract the most impactful, memorable quote that captures the essence of the idea. This quote should be:
- Inspiring and thought-provoking
- 50-150 characters long
- Something that would make people want to learn more
- Representative of the core value proposition

Pitch transcript:
"${transcript}"

Extract the most compelling quote that would work well in a pitch card or marketing material. If the transcript doesn't contain a strong quote, create one that captures the essence of the idea.

Respond with just the quote, no additional text or formatting.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at identifying compelling quotes from business pitches. Always respond with just the quote, no additional text.'
        },
        {
          role: 'user',
          content: quoteExtractionPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const extractedQuote = completion.choices[0]?.message?.content?.trim();
    
    if (!extractedQuote) {
      throw new Error('No quote extracted');
    }

    // Clean up the quote - remove quotes if present and trim
    let cleanQuote = extractedQuote.replace(/^["']|["']$/g, '').trim();
    
    // If the quote is too long, truncate it
    if (cleanQuote.length > 150) {
      cleanQuote = cleanQuote.substring(0, 147) + '...';
    }

    return cleanQuote;

  } catch (error) {
    console.error('Error in quote extraction:', error);
    
    // Fallback: use the first sentence or a portion of the transcript
    const sentences = transcript.split(/[.!?]/);
    const firstSentence = sentences[0]?.trim();
    
    if (firstSentence && firstSentence.length > 20 && firstSentence.length < 150) {
      return firstSentence;
    }
    
    // If no good sentence found, create a generic quote
    return transcript.length > 100 
      ? transcript.substring(0, 97) + '...'
      : transcript;
  }
} 