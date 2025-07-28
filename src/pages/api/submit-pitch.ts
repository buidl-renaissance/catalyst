import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { pitches } from '@/db/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { title, description, transcript, audioUrl, tags } = req.body;

    // Validate required fields
    if (!title || !transcript) {
      return res.status(400).json({ 
        success: false, 
        error: 'Title and transcript are required' 
      });
    }

    // Insert pitch into database
    const [pitch] = await db.insert(pitches).values({
      title: title.trim(),
      description: description?.trim() || '',
      transcript: transcript.trim(),
      audioUrl: audioUrl || '',
      tags: tags && tags.length > 0 ? JSON.stringify(tags) : null,
      status: 'published'
    }).returning();

    return res.status(200).json({
      success: true,
      pitch: {
        id: pitch.id,
        uuid: pitch.uuid,
        title: pitch.title,
        status: pitch.status
      }
    });

  } catch (error) {
    console.error('Error submitting pitch:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to submit pitch' 
    });
  }
} 