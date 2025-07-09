import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

interface Params { id: string; lessonId: string; }

const LessonUpdateSchema = z.object({
  topic: z.string().optional(),
  experience: z.string().optional(),
  impactRecurrence: z.string().optional(),
  lessonsLearned: z.string().optional(),
  bestPractice: z.string().optional(),
  assignedTo: z.string().optional(),
}).partial();

// Get a single lesson by ID
export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id: projectId, lessonId } = await params;
  const parsedId = parseInt(lessonId);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const lesson = await prisma.lessonsLearned.findFirst({
    where: { id: parsedId, projectId },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  return NextResponse.json(lesson);
}

// Update a lesson by ID
export async function PATCH(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id: projectId, lessonId } = await params;
  const parsedId = parseInt(lessonId);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const data = LessonUpdateSchema.parse(await req.json());

  const existing = await prisma.lessonsLearned.findFirst({
    where: { id: parsedId, projectId },
  });
  if (!existing) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const updatedLesson = await prisma.lessonsLearned.update({
    where: { id: parsedId },
    data,
  });

  return NextResponse.json(updatedLesson);
}

// Delete a lesson by ID
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id: projectId, lessonId } = await params;
  const parsedId = parseInt(lessonId);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const existing = await prisma.lessonsLearned.findFirst({
    where: { id: parsedId, projectId },
  });
  if (!existing) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  await prisma.lessonsLearned.delete({
    where: { id: parsedId },
  });

  return NextResponse.json({ message: "Lesson deleted successfully" });
}
