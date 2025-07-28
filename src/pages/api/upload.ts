import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadFile } from '@/lib/upload';

// Configure body parser for larger file uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { file, fileName, fileType, folder } = req.body;

    if (!file || !fileName || !fileType) {
      return res.status(400).json({ success: false, error: 'Missing required file data' });
    }

    // Remove data URL prefix and convert base64 to buffer
    const base64Data = file.split(',')[1];
    const fileBuffer = Buffer.from(base64Data, 'base64');

    // Upload file using the upload utility
    const publicUrl = await uploadFile(
      fileBuffer,
      fileName,
      fileType,
      folder || '' // Optional folder path
    );

    return res.status(200).json({
      success: true,
      url: publicUrl
    });

  } catch (error) {
    console.error('Error handling file upload:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to upload file'
    });
  }
}
