import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: 'Email is required' });
    }

    // Here you would typically:
    // 1. Validate the email
    // 2. Store it in your database
    // 3. Maybe send it to your email marketing service
    // For now, we'll just log it
    console.log('Email collected:', email);

    return res.status(200).json({
      success: true,
      message: 'Email collected successfully',
    });
  } catch (error) {
    console.error('Error collecting email:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
