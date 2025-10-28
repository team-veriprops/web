import { for_sale_details } from "@data/mock-my-for-sales";
import { NextRequest, NextResponse } from "next/server";

// GET one
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log("Query params:", id);

  const for_sale_detail = for_sale_details.find((p) => p.for_sale_id === id);

  return for_sale_detail
    ? NextResponse.json(for_sale_detail)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
