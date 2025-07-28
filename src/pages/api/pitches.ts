import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { pitches } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Fetch all published pitches, ordered by creation date (newest first)
    const allPitches = await db
      .select()
      .from(pitches)
      .where(eq(pitches.status, 'published'))
      .orderBy(pitches.createdAt);

    // Transform the data to match the expected format
    const transformedPitches = allPitches.map(pitch => {
      const tags = pitch.tags ? JSON.parse(pitch.tags) : [];
      
      // Extract creator name from title or use a default
      const creatorName = pitch.title.split(' ')[0] + ' ' + (pitch.title.split(' ')[1] || '');
      const avatar = creatorName.split(' ').map(n => n[0]).join('');
      
      // Use the AI-extracted quote if available, otherwise fallback to transcript
      const quote = pitch.quote || (pitch.transcript.length > 100 
        ? pitch.transcript.substring(0, 100) + '...'
        : pitch.transcript);
      
      // Create summary from description or transcript
      const summary = pitch.description || pitch.transcript.substring(0, 200) + '...';
      
      // Calculate time ago
      const now = new Date();
      const created = new Date(pitch.createdAt);
      const diffInHours = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60));
      let timestamp;
      if (diffInHours < 1) timestamp = 'Just now';
      else if (diffInHours < 24) timestamp = `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
      else {
        const diffInDays = Math.floor(diffInHours / 24);
        timestamp = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
      }

      return {
        id: pitch.id,
        creator: creatorName,
        title: pitch.title,
        avatar: avatar,
        quote: quote,
        summary: summary,
        tags: tags,
        timestamp: timestamp,
        audioUrl: pitch.audioUrl,
        transcript: pitch.transcript
      };
    });

    return res.status(200).json({
      success: true,
      pitches: transformedPitches
    });

  } catch (error) {
    console.error('Error fetching pitches:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch pitches' 
    });
  }
} 