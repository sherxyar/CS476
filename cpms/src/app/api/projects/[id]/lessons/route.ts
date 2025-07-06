import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

interface Params { id: string; }


const LessonSchema = z.object({
  topic: z.string().optional(),
  experience: z.string().optional(),
  impactRecurrence: z.string().optional(),
  lessonsLearned: z.string().optional(),
  bestPractice: z.string().optional(),
  assignedTo: z.string().optional(),
});
type CreateLessonPayload = z.infer<typeof LessonSchema>;

// GET all lessons learned 
export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;

  const lessons = await prisma.lessonsLearned.findMany({
    where: { projectId: id },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(lessons);
}

// POST a new lesson learned entry
export async function POST(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  const body: CreateLessonPayload = LessonSchema.parse(await req.json());

  const lesson = await prisma.lessonsLearned.create({
    data: { ...body, projectId: id },
  });

  return NextResponse.json(lesson, { status: 201 });
}
