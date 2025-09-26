import { NextRequest, NextResponse } from "next/server";
import { properties } from "@data/mock-properties";

// GET one
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log("Query params:", id);

  const property = properties.find((p) => p.slug === id);

  return property
    ? NextResponse.json(property)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

// PUT - update
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const idx = properties.findIndex((p) => p.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  properties[idx] = { ...properties[idx], ...body };

  return NextResponse.json(properties[idx]);
}

// DELETE
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const idx = properties.findIndex((p) => p.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const [deleted] = properties.splice(idx, 1);
  return NextResponse.json(deleted);
}
