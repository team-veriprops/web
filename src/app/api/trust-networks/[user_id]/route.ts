import { trustNetworks } from "@data/mock-trust-network";
import { NextRequest, NextResponse } from "next/server";

// GET one
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  const { user_id } = await params;
  console.log("Query params:", user_id);

  const property = trustNetworks.find((p) => p.user_id === user_id);

  return property
    ? NextResponse.json(property)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

// PUT - update
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  const { user_id } = await params;

  const idx = trustNetworks.findIndex((p) => p.user_id === user_id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  trustNetworks[idx] = { ...trustNetworks[idx], ...body };

  return NextResponse.json(trustNetworks[idx]);
}

// DELETE
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  const { user_id } = await params;

  const idx = trustNetworks.findIndex((p) => p.user_id === user_id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const [deleted] = trustNetworks.splice(idx, 1);
  return NextResponse.json(deleted);
}
