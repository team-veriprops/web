import { QueryForSaleDto } from "@components/portal/my-for-sale/models";
import { for_sales, generateMyForSale } from "@data/mock-my-for-sales";

import { NextRequest, NextResponse } from "next/server";
// GET all or search/filter

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Query params
  const type = searchParams.get("type")?.toLowerCase();
  const query = searchParams.get("query")?.toLowerCase();
  const page = Math.max(parseInt(searchParams.get("page") || "0", 10), 0); // zero-indexed
  const page_size = Math.max(
    parseInt(searchParams.get("page_size") || "10", 10),
    1
  );

  // Apply filters
  let filtered = for_sales.filter((p) => {
    let matches = true;

    if(type){
      matches = matches && p.type.toLowerCase().includes(type)
    }
    if (query) {
      matches = matches && p.title.toLowerCase().includes(query);
    }

    return matches;
  });

  // Apply sorting
  filtered.sort(
        (a, b) =>
          new Date(b.date_created!).getTime() - new Date(a.date_created!).getTime()
      );

  // Pagination
  const total = filtered.length;
  const start = page * page_size;
  const paginated = filtered.slice(start, start + page_size);

  // Page response
  const pageResponse = {
    items: paginated as QueryForSaleDto[],
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
export async function POST(req: Request) {
  const body = await req.json();
  const newForSale = { ...generateMyForSale(), ...body };

  for_sales.push(newForSale);
  return NextResponse.json(newForSale, { status: 201 });
}
