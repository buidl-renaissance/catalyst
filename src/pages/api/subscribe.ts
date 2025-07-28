import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../db';
import { subscriptions } from '../../db/schema';
import { sql } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, source = 'dragon-page' } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if email already exists
    const existingSubscription = await db
      .select()
      .from(subscriptions)
      .where(sql`${subscriptions.email} = ${email}`)
      .limit(1);

    if (existingSubscription.length > 0) {
      return res.status(409).json({ 
        error: 'Email already subscribed',
        message: 'This email is already subscribed to our updates.' 
      });
    }

    // Insert new subscription
    const newSubscription = await db.insert(subscriptions).values({
      email,
      source,
      status: 'active'
    }).returning();

    return res.status(201).json({ 
      success: true,
      message: 'Successfully subscribed to updates!',
      subscription: newSubscription[0]
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong. Please try again.' 
    });
  }
} 