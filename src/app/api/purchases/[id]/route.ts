import { NextRequest, NextResponse } from "next/server";
import { purchaseDetails } from "@data/mock-purchases";

// GET one
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log("Query params:", id);

  const purchaseDetail = purchaseDetails.find((p) => p.purchase_id === id);

  return purchaseDetail
    ? NextResponse.json(purchaseDetail)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
