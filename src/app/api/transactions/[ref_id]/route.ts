import { NextRequest, NextResponse } from "next/server";
import { transactionDetails } from "@data/mock-transactions";

// GET one
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ ref_id: string }> }
) {
  const { ref_id } = await params;

  const transactionDetail = transactionDetails.find((p) => p.ref_id === ref_id);

  return transactionDetail
    ? NextResponse.json(transactionDetail)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
