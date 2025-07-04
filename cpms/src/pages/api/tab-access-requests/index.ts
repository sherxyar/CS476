// src/pages/api/tab-access-requests/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
  
    const requests = await prisma.tabAccessRequest.findMany({
      include: {
        user: true,
        approver: true,
      },
    });
    return res.status(200).json(requests);
  }

  if (req.method === 'POST') {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    try {
      const newRequest = await prisma.tabAccessRequest.create({
        data: {
          userId,
        },
      });
      return res.status(201).json(newRequest);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create request' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
