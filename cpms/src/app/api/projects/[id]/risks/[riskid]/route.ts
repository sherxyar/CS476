// src/app/api/projects/[id]/risks/[riskid]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { riskid: string };


// PATCH 
export async function PATCH(
  req: Request,
  { params }: { params: Promise<Params> }
) 
{
  const { riskid } = await params;
  const id = Number(riskid);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid risk ID" }, { status: 400 });
  }

  const body = await req.json(); 

  try {
    const updated = await prisma.riskRegister.update({
      where: { id },
      data: body,            
    });
    return NextResponse.json(updated); 
  } catch (err) {
    console.error(`PATCH /risks/${id} –`, err);
    return NextResponse.json(
      { error: "Failed to update risk" },
      { status: 500 }
    );
  }
}

// Delete a risk by ID
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  const { riskid } = await params;
  const id = Number(riskid);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid risk ID" }, { status: 400 });
  }

  try {
    await prisma.riskRegister.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(`DELETE /risks/${id} –`, err);
    return NextResponse.json(
      { error: "Failed to delete risk" },
      { status: 500 }
    );
  }
}
