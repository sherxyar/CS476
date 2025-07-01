// this file creates and gets invoices.

import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
prisma.invoice.findMany();

type Params = { id: string }; 

// Get Request for invoices
export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;

  try {
    const invoices = await prisma.invoice.findMany({
      where: { projectId: id },
      orderBy: { dateIssued: "desc" },
    });

    return NextResponse.json(invoices); // 200
  } catch (err) {
    console.error(`GET /api/projects/${id}/invoices -`, err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Post Request to create a new invoice
export async function POST(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  const body = await req.json();

  if (
    !body.invoiceNumber ||
    !body.dateIssued ||
    body.amount === undefined ||
    !body.vendor
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const amount = new Prisma.Decimal(body.amount); // keep cents precision

    const newInvoice = await prisma.$transaction(async (tx) => {
      // Create the invoice
      const invoice = await tx.invoice.create({
        data: {
          projectId: id,
          invoiceNumber: body.invoiceNumber,
          dateIssued: new Date(body.dateIssued),
          amount,
          status: body.status ?? "NOT_PAID",
          vendor: body.vendor,
        },
      });

      // If invoice is paid, update project's actuals
      if (invoice.status === "PAID") {
        await tx.project.update({
          where: { id },
          data: { actuals: { increment: amount.toNumber() } },
        });
      }

      return invoice;
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (err: any) {

    // Duplicate invoice number catch
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Invoice number already exists for this project" },
        { status: 409 }
      );
    }

    console.error(`POST /api/projects/${id}/invoices –`, err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
