import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { pitches } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { STANDARD_TAGS, getAllTags } from '@/lib/tags';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Get all pitches to extract existing tags
    const allPitches = await db
      .select({ tags: pitches.tags })
      .from(pitches)
      .where(eq(pitches.status, 'published'));

    // Extract all unique tags from existing pitches
    const existingTags = allPitches
      .map(pitch => pitch.tags ? JSON.parse(pitch.tags) : [])
      .flat()
      .filter((tag, index, array) => array.indexOf(tag) === index); // Remove duplicates

    // Get all available tags (standard + existing)
    const allAvailableTags = getAllTags(existingTags);

    return res.status(200).json({
      success: true,
      tags: {
        standard: STANDARD_TAGS,
        all: allAvailableTags,
        existing: existingTags
      }
    });

  } catch (error) {
    console.error('Error fetching tags:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch tags'
    });
  }
} 