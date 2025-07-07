import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // ID 검증: 문자열이고 숫자로 변환 가능한지 확인
  if (typeof id !== 'string' || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const numericId = parseInt(id, 10);

  if (req.method === 'PUT') {
    const {
      description,
      impactArea,
      justification,
      approvedBy,
      status,
      priority,
      estimatedImpact,
      oldValue,
      newValue,
      category,
      changeType,
    } = req.body;

    // 필수 필드 체크
    if (!description || !impactArea || !justification || !status) {
      return res.status(400).json({
        error: 'Missing required fields: description, impactArea, justification, status',
      });
    }

    try {
      // 변경 로그 업데이트
      const updatedLog = await prisma.changeLog.update({
        where: { id: numericId },
        data: {
          description,
          impactArea,
          justification,
          approvedBy: approvedBy ?? null, // nullable 처리
          status,
          priority: priority ?? null,
          estimatedImpact: estimatedImpact ?? null,
          oldValue: oldValue ?? null,
          newValue: newValue ?? null,
          category: category ?? null,
          changeType: changeType ?? null,
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
      // 변경 로그 삭제
      await prisma.changeLog.delete({
        where: { id: numericId },
      });
      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting change log:', error);
      return res.status(500).json({ error: 'Failed to delete change log' });
    }
  }

  // 허용되지 않은 메서드 차단
  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
