import { prisma, Prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { invoiceId: string };


// Patch Request to update an existing invoice
export async function PATCH(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { invoiceId } = await params;
  const id = Number(invoiceId);
  const body = await req.json();

  const existing = await prisma.invoice.findUnique({ where: { id } });
  if (!existing)
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  try {
    const amount = new Prisma.Decimal(body.amount ?? existing.amount);
    const newStatus = (body.status ?? existing.status) as "PAID" | "NOT_PAID";

    let delta = new Prisma.Decimal(0);
    if (existing.status === "NOT_PAID" && newStatus === "PAID") delta = amount;
    if (existing.status === "PAID" && newStatus === "NOT_PAID")
      delta = amount.neg();

    const updated = await prisma.$transaction(async (tx) => {
      const inv = await tx.invoice.update({
        where: { id },
        data: {
          invoiceNumber: body.invoiceNumber ?? existing.invoiceNumber,
          dateIssued: body.dateIssued
            ? new Date(body.dateIssued)
            : existing.dateIssued,
          amount,
          status: newStatus,
          vendor: body.vendor ?? existing.vendor,
        },
      });

      if (!delta.isZero()) {
        await tx.project.update({
          where: { id: existing.projectId },
          data: { actuals: { increment: delta } },
        });
      }

      return inv;
    });

    return NextResponse.json(updated); // 200
  } catch (err) {
    console.error(`PATCH /api/invoices/${invoiceId} -`, err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Delete Request to remove an invoice
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  const { invoiceId } = await params;
  const id = Number(invoiceId);

  const existing = await prisma.invoice.findUnique({ where: { id } });
  if (!existing)
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  try {
    await prisma.$transaction(async (tx) => {
      // if it was already paid, subtract from actuals first
      if (existing.status === "PAID") {
        await tx.project.update({
          where: { id: existing.projectId },
          data: { actuals: { decrement: existing.amount } },
        });
      }

      await tx.invoice.delete({ where: { id } });
    });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(`DELETE /api/invoices/${invoiceId} -`, err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
