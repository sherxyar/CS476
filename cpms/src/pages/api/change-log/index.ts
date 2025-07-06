import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      changeType,
      category,
      description,
      impactArea,
      oldValue,
      newValue,
      justification,
      requestedBy,
      approvedBy,
      status,
      priority,
      estimatedImpact,
      projectId,
      userId,
    } = req.body;

    if (
      typeof changeType !== 'string' ||
      typeof category !== 'string' ||
      typeof description !== 'string' ||
      typeof impactArea !== 'string' ||
      typeof justification !== 'string' ||
      typeof requestedBy !== 'string' ||
      typeof approvedBy !== 'string' ||
      typeof status !== 'string' ||
      typeof priority !== 'string' ||
      typeof estimatedImpact !== 'string'
    ) {
      return res.status(400).json({ error: 'Missing or invalid required fields.' });
    }

    try {
      const newLog = await prisma.changeLog.create({
        data: {
          changeType,
          category,
          description,
          impactArea,
          oldValue: oldValue || null,
          newValue: newValue || null,
          justification,
          requestedBy,
          approvedBy,
          status,
          priority,
          estimatedImpact,
          projectId: projectId || null,
          userId: userId || null,
        },
        include: {
          user: true,
        },
      });

      return res.status(201).json(newLog);
    } catch (error) {
      console.error('❌ Error creating change log:', error);
      return res.status(500).json({ error: 'Internal server error while creating change log' });
    }
  }

  if (req.method === 'GET') {
    const { projectId, userId } = req.query;

    try {
      const logs = await prisma.changeLog.findMany({
        where: {
          ...(projectId ? { projectId: projectId as string } : {}),
          ...(userId ? { userId: Number(userId) } : {}),
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      });

      return res.status(200).json(logs);
    } catch (error) {
      console.error('❌ Error fetching change logs:', error);
      return res.status(500).json({ error: 'Internal server error while fetching change logs' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
