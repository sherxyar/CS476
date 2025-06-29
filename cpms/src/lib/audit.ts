import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface AuditLogParams {
  userId?: number
  action: string
  tableName: string
  recordId: number
  beforeData?: object | null
  afterData?: object | null
}

export async function logAudit({
  userId,
  action,
  tableName,
  recordId,
  beforeData,
  afterData,
}: AuditLogParams) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      tableName,
      recordId,
      ...(beforeData && { beforeData: JSON.stringify(beforeData) }),
      ...(afterData && { afterData: JSON.stringify(afterData) }),
    },
  })
}
