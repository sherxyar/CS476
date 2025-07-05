import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string' || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const numericId = parseInt(id);

  if (req.method === 'PUT') {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    try {
      const updatedLog = await prisma.changeLog.update({
        where: { id: numericId },
        data: {
          title,
          description,
        },
      });
      return res.status(200).json(updatedLog);
    } catch (error) {
      console.error('Error updating change log:', error);
      return res.status(500).json({ error: 'Failed to update change log' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.changeLog.delete({
        where: { id: numericId },
      });
      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting change log:', error);
      return res.status(500).json({ error: 'Failed to delete change log' });
    }
  }


  return res.setHeader('Allow', ['PUT', 'DELETE']).status(405).json({ error: 'Method not allowed' });
}
