
import { properties, generateHouse, generateLand } from "@data/mock-properties";
import { PropertyType } from "@components/website/property/models";
import { NextRequest, NextResponse } from "next/server";
import { QueryPropertyDto } from "@components/website/property/models";
// GET all or search/filter

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Query params
  const grouping_city = searchParams.get("grouping_city")?.toLowerCase();
  const type = searchParams.get("type")?.toLowerCase();
  const query = searchParams.get("query")?.toLowerCase();
  const page = Math.max(parseInt(searchParams.get("page") || "0", 10), 0); // zero-indexed
  const page_size = Math.max(parseInt(searchParams.get("page_size") || "10", 10), 1);

  // Apply filters
  let filtered = properties.filter((p) => {
    let matches = true;

    if (grouping_city) {
      matches = matches && p.location.grouping_city.toLowerCase() === grouping_city;
    }

    if (type) {
      matches = matches && p.type.toLowerCase() === type;
    }

    if (query) {
      matches = matches && p.title.toLowerCase().includes(query);
    }

    return matches;
  });

  // Pagination
  const total = filtered.length;
  const start = page * page_size;
  const paginated = filtered.slice(start, start + page_size);

  // Page response
  const pageResponse = {
    data: paginated as QueryPropertyDto[],
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
  let newProperty;

  if (body.type === PropertyType.HOUSE) {
    newProperty = { ...generateHouse(), ...body };
  } else {
    newProperty = { ...generateLand(), ...body };
  }

  properties.push(newProperty);
  return NextResponse.json(newProperty, { status: 201 });
}
