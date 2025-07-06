import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';

// --- Risk Register API Handlers ---

// Function to fetch all Risk Register entries
export async function getRiskRegisters(req: NextApiRequest, res: NextApiResponse) {
  try {
    const risks = await prisma.riskRegister.findMany({
      orderBy: { id: "asc" }, // Order by ID for consistency
    });
    return NextResponse.json(risks);
  } catch (error) {
    console.error("Error fetching all risk registers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Function to create a new Risk Register entry
export async function createRiskRegister(req: Request) {
  try {
    const data = await req.json();
    const newRisk = await prisma.riskRegister.create({
      data,
    });
    return NextResponse.json(newRisk, { status: 201 }); // 201 Created
  } catch (error) {
    console.error("Error creating risk register:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Function to fetch a single Risk Register entry by ID
export async function getRiskRegisterById(id: string) {
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const risk = await prisma.riskRegister.findUnique({
      where: { id: parsedId },
    });

    if (!risk) {
      return NextResponse.json({ error: "Risk not found" }, { status: 404 });
    }

    return NextResponse.json(risk);
  } catch (error) {
    console.error(`Error fetching risk register with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Function to update a Risk Register entry by ID
export async function updateRiskRegister(id: string, req: Request) {
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const data = await req.json();
    const updatedRisk = await prisma.riskRegister.update({
      where: { id: parsedId },
      data,
    });
    return NextResponse.json(updatedRisk);
  } catch (error) {
    console.error(`Error updating risk register with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Function to delete a Risk Register entry by ID
export async function deleteRiskRegister(id: string) {
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.riskRegister.delete({
      where: { id: parsedId },
    });
    return NextResponse.json({ message: "Risk deleted successfully" });
  } catch (error) {
    console.error(`Error deleting risk register with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// --- Lessons Learned API Handlers ---

// Function to fetch all Lessons Learned entries
export async function getLessonsLearned() {
  try {
    const lessons = await prisma.lessonsLearned.findMany({
      orderBy: { id: "asc" }, // Order by ID for consistency
    });
    return NextResponse.json(lessons);
  } catch (error) {
    console.error("Error fetching all lessons learned:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Function to create a new Lessons Learned entry
export async function createLessonLearned(req: Request) {
  try {
    const data = await req.json();
    const newLesson = await prisma.lessonsLearned.create({
      data,
    });
    return NextResponse.json(newLesson, { status: 201 }); // 201 Created
  } catch (error) {
    console.error("Error creating lesson learned:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Function to fetch a single Lessons Learned entry by ID
export async function getLessonLearnedById(id: string) {
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const lesson = await prisma.lessonsLearned.findUnique({
      where: { id: parsedId },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json(lesson);
  } catch (error) {
    console.error(`Error fetching lesson learned with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Function to update a Lessons Learned entry by ID
export async function updateLessonLearned(id: string, req: Request) {
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const data = await req.json();
    const updatedLesson = await prisma.lessonsLearned.update({
      where: { id: parsedId },
      data,
    });
    return NextResponse.json(updatedLesson);
  } catch (error) {
    console.error(`Error updating lesson learned with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Function to delete a Lessons Learned entry by ID
export async function deleteLessonLearned(id: string) {
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.lessonsLearned.delete({
      where: { id: parsedId },
    });
    return NextResponse.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    console.error(`Error deleting lesson learned with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

