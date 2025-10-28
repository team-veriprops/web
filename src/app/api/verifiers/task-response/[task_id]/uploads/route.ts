import { NextRequest, NextResponse } from "next/server";
import { disputes, generateDispute } from "@data/mock-disputes";
import { QueryDisputeDto } from "@components/trust-network/disputes/models";

// POST - create
export async function POST(
  req: Request,
  { params }: { params: Promise<{ user_id: string }> }
) {
  const { user_id } = await params;
  const body = await req.json();
  const newDispute = { ...(await generateDispute(user_id)), ...body };

  disputes.push(newDispute);
  return NextResponse.json(newDispute, { status: 201 });
}
