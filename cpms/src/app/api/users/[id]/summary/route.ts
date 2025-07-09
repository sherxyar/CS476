import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }  
) {
  const { id: idStr } = await params               
  const id = Number(idStr)

  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: 'Bad id' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      _count: { select: { addedMembers: true } },
      auditLogs: {
        orderBy: { timestamp: 'desc' },
        take: 10,
        select: { action: true, tableName: true, timestamp: true },
      },
    },
  })

  return user
    ? NextResponse.json(user)
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}
