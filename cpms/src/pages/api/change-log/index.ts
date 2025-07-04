import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, projectId, createdById } = req.body;

    if (!title || !description || !projectId || !createdById) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      const newLog = await prisma.changeLog.create({
        data: {
          title,
          description,
          projectId,
          createdById,
        },
      });
      return res.status(201).json(newLog);
    } catch (error) {
      console.error('Error creating change log:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'GET') {
    const { projectId, createdById } = req.query;

    try {
      const logs = await prisma.changeLog.findMany({
        where: {
          ...(projectId ? { projectId: projectId as string } : {}),
          ...(createdById ? { createdById: Number(createdById) } : {}),
        },
        orderBy: { createdAt: 'desc' },
        include: {
          createdBy: true, 
        },
      });
      return res.status(200).json(logs);
    } catch (error) {
      console.error('Error fetching change logs:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
