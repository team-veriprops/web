import { QueryCityGroupedPropertiesDto, Property, QueryPropertyDto } from "@components/website/property/models";
import { properties } from "@data/mock-properties";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type") as "land" | "house" | null;
  const searchQuery = searchParams.get("searchQuery"); // e.g., "Lagos,Abuja,Ibadan"
  const page = Math.max(parseInt(searchParams.get("page") || "0", 10), 0); // zero-indexed
  const page_size = Math.max(parseInt(searchParams.get("page_size") || "10", 10), 1);

  // Filter by type
  let filtered = properties;
  if (type) {
    filtered = filtered.filter(
      (p) => p.type && p.type.toLowerCase() === type.toLowerCase()
    );
  }

  // Group by city
  const grouped: Record<string, QueryPropertyDto[]> = {};
  filtered.forEach((p) => {
    const key = p.location?.grouping_city.toLowerCase()!;
    if (!grouped[key]) grouped[key!] = [];
    grouped[key!].push(p);
  });

  let result: QueryCityGroupedPropertiesDto[] = Object.values(grouped).map(
    (props) => ({
      city: props[0].location?.grouping_city!,
      properties: props,
    })
  );

  // Filter & order by searchQuery
  if (searchQuery) {
    const searchCities = searchQuery.split(",").map((c) => c.trim());
    const cityMap = new Map(result.map((r) => [r.city.toLowerCase(), r]));
    result = searchCities.map((city) => cityMap.get(city.toLowerCase()) ?? { city, properties: [] });
  }

  const total = result.length;
  const start = page * page_size;
  const paginated = result.slice(start, start + page_size);

  const pageResponse = {
    items: paginated,
    page,
    page_size: page_size,
    total_pages: Math.ceil(total / page_size),
    count: paginated.length,
    total,
    prev_page: page > 0 ? page - 1 : undefined,
    next_page: start + page_size < total ? page + 1 : undefined,
  };

  return NextResponse.json(pageResponse);
}
