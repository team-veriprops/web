import { QueryMessageDto } from "@components/portal/conversations/messages/models";
import { messages, generateMessage } from "@data/mock-conversations";

import { NextRequest, NextResponse } from "next/server";
// GET all or search/filter

export async function GET(req: NextRequest,
  { params }: { params: Promise<{ conversation_id: string }> }
) {
  const { conversation_id } = await params;
  const { searchParams } = new URL(req.url);

  // Query params
  const page = Math.max(parseInt(searchParams.get("page") || "0", 10), 0); // zero-indexed
  const page_size = Math.max(
    parseInt(searchParams.get("page_size") || "10", 10),
    1
  );

  // console.log("messages: ", messages)
  // Apply filters
  let filtered = messages.filter((p) => {
    let matches = true;

    if (conversation_id) {
      matches = matches && p.conversation_id.toLowerCase().includes(conversation_id);
    }else{ // conversation_id is mandatory
      matches = false
    }

    return matches;
  });
  // console.log("filtered: ", filtered)
  // Apply sorting
  filtered.sort(
        (a, b) =>
          new Date(a.date_created!).getTime() - new Date(b.date_created!).getTime()
      );

  // Pagination
  const total = filtered.length;
  const start = page * page_size;
  const paginated = filtered.slice(start, start + page_size);

  // Page response
  const pageResponse = {
    items: paginated as QueryMessageDto[],
    page,
    page_size,
    total_pages: Math.ceil(total / page_size),
    count: paginated.length,
    total,
    prev_page: page > 0 ? page - 1 : undefined,
    next_page: start + page_size < total ? page + 1 : undefined,
  };

  return NextResponse.json(pageResponse);
}

// POST - create
export async function POST(req: Request,
  { params }: { params: Promise<{ conversation_id: string }> }
) {
  const { conversation_id } = await params;
  const body = await req.json();
  const generated_message = await generateMessage(conversation_id)
  const newMessage = { ...generated_message, ...body };


  messages.push(newMessage);
  return NextResponse.json(newMessage, { status: 201 });
}
