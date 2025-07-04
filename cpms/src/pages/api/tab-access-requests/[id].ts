// src/pages/api/tab-access-requests/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  if (req.method === 'PUT') {
    const { approvedBy } = req.body;

    if (!approvedBy) {
      return res.status(400).json({ error: 'approvedBy is required' });
    }

    try {
      const updatedRequest = await prisma.tabAccessRequest.update({
        where: { id: parseInt(id) },
        data: {
          approvedBy,
        },
      });
      return res.status(200).json(updatedRequest);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to approve request' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.tabAccessRequest.delete({
        where: { id: parseInt(id) },
      });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete request' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
