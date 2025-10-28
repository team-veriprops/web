import { transactions } from "@data/mock-transactions";

import { NextRequest, NextResponse } from "next/server";
import { QueryTransactionDto } from "@components/portal/transactions/models";
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
  let filtered = transactions.filter((p) => {
    let matches = true;

    if(type && type !== "all"){
      matches = matches && p.type.toLowerCase().includes(type)
    }
    if (query) {
      matches = matches && p.ref_id.toLowerCase().includes(query);
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
    items: paginated as QueryTransactionDto[],
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
