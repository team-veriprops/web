import { getActiveAuditor, users } from "@data/mock-users";
import { NextRequest, NextResponse } from "next/server";

// Logged In User Details
export async function GET(_req: NextRequest) {
  const activeAuditor = await getActiveAuditor();
  return activeAuditor
    ? NextResponse.json(activeAuditor)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

// Logout
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const idx = users.findIndex((p) => p.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const [deleted] = users.splice(idx, 1);
  return NextResponse.json(deleted);
}
