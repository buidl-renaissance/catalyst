import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { pitches } from '@/db/schema';
import { eq, isNull } from 'drizzle-orm';

// Function to extract quote using AI (same as in submit-pitch.ts)
async function extractQuote(transcript: string): Promise<string> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/extract-quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcript }),
    });

    const data = await response.json();
    
    if (data.success && data.quote) {
      return data.quote;
    }
    
    // Fallback: use first sentence of transcript
    const sentences = transcript.split(/[.!?]/);
    const firstSentence = sentences[0]?.trim();
    
    if (firstSentence && firstSentence.length > 20 && firstSentence.length < 150) {
      return firstSentence;
    }
    
    return transcript.length > 100 
      ? transcript.substring(0, 97) + '...'
      : transcript;
      
  } catch (error) {
    console.error('Error extracting quote:', error);
    
    // Fallback: use first sentence of transcript
    const sentences = transcript.split(/[.!?]/);
    const firstSentence = sentences[0]?.trim();
    
    if (firstSentence && firstSentence.length > 20 && firstSentence.length < 150) {
      return firstSentence;
    }
    
    return transcript.length > 100 
      ? transcript.substring(0, 97) + '...'
      : transcript;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Get all pitches that don't have quotes yet
    const pitchesWithoutQuotes = await db
      .select()
      .from(pitches)
      .where(isNull(pitches.quote));

    if (pitchesWithoutQuotes.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'All pitches already have quotes',
        updated: 0
      });
    }

    let updatedCount = 0;

    // Update each pitch with an AI-extracted quote
    for (const pitch of pitchesWithoutQuotes) {
      try {
        const quote = await extractQuote(pitch.transcript);
        
        await db
          .update(pitches)
          .set({ quote })
          .where(eq(pitches.id, pitch.id));

        updatedCount++;
      } catch (error) {
        console.error(`Error updating pitch ${pitch.id}:`, error);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Updated ${updatedCount} pitches with quotes`,
      updated: updatedCount
    });

  } catch (error) {
    console.error('Error updating existing quotes:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update existing quotes'
    });
  }
} 