import { Prisma, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

type Params = { id: string };

type CreateInvoicePayload = {
  invoiceNumber: string;
  dateIssued: string;            
  amount: string | number;
  vendor: string;
  status?: 'PAID' | 'NOT_PAID';
};

// GET 
export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;

  try {
    const invoices = await prisma.invoice.findMany({
      where: { projectId: id },
      orderBy: { dateIssued: 'desc' },
    });

    return NextResponse.json(invoices);            // 200
  } catch (err: unknown) {
    console.error(`GET /api/projects/${id}/invoices -`, err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

//  POST 
export async function POST(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  const body = (await req.json()) as CreateInvoicePayload;

  // Payload validation
  if (
    !body.invoiceNumber ||
    !body.dateIssued ||
    body.amount === undefined ||
    !body.vendor
  ) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 },
    );
  }

  try {
    // keep cent-level precision
    const amount = new Prisma.Decimal(body.amount);

    const newInvoice = await prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.create({
        data: {
          projectId: id,
          invoiceNumber: body.invoiceNumber,
          dateIssued: new Date(body.dateIssued),
          amount,
          status: body.status ?? 'NOT_PAID',
          vendor: body.vendor,
        },
      });

      // If invoice is paid, update project.actuals
      if (invoice.status === 'PAID') {
        await tx.project.update({
          where: { id },
          data: { actuals: { increment: amount.toNumber() } },
        });
      }

      return invoice;
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (err: unknown) {

    //  Prisma duplication error (code P2002)                               
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'Invoice number already exists for this project' },
        { status: 409 },
      );
    }

    console.error(`POST /api/projects/${id}/invoices -`, err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
