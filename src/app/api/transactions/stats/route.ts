import { transactionStats } from "@data/mock-transactions";
import { NextRequest, NextResponse } from "next/server";

// GET one
export async function GET(
  _req: NextRequest) {

  return transactionStats
    ? NextResponse.json(transactionStats)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
