import { S3 } from '@aws-sdk/client-s3';

// Server-side only upload function
export async function uploadFile(
  fileBuffer: Buffer, 
  fileName: string, 
  contentType: string,
  folder: string = ''
): Promise<string> {
  if (!process.env.DO_SPACES_ACCESS_KEY_ID || 
      !process.env.DO_SPACES_SECRET_ACCESS_KEY || 
      !process.env.DO_SPACES_ENDPOINT || 
      !process.env.DO_SPACES_BUCKET_NAME) {
    throw new Error('Missing required Digital Ocean configuration');
  }

  // Initialize S3 client
  const s3 = new S3({
    endpoint: process.env.DO_SPACES_ENDPOINT,
    region: process.env.DO_SPACES_REGION, // Digital Ocean Spaces default region
    credentials: {
      accessKeyId: process.env.DO_SPACES_ACCESS_KEY_ID,
      secretAccessKey: process.env.DO_SPACES_SECRET_ACCESS_KEY
    }
  });

  // Create unique file path
  const timestamp = new Date().getTime();
  const uniquePath = folder 
    ? `${folder}/${timestamp}-${fileName}`
    : `${timestamp}-${fileName}`;

  try {
    // Upload to Digital Ocean Space
    await s3.putObject({
      Bucket: process.env.DO_SPACES_BUCKET_NAME,
      Key: uniquePath,
      Body: fileBuffer,
      ContentType: contentType,
      ACL: 'public-read'
    });

    // Return the public URL
    return `${process.env.DO_SPACES_ENDPOINT}/${process.env.DO_SPACES_BUCKET}/${uniquePath}`;

  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}

