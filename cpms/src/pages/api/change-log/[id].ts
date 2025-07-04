import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    const { title, description } = req.body;

    try {
      const updatedLog = await prisma.changeLog.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          
        },
      });
      return res.status(200).json(updatedLog);
    } catch (error) {
      console.error('Error updating change log:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.changeLog.delete({
        where: { id: parseInt(id) },
      });
      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting change log:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
