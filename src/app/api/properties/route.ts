import { properties, generateHouse, generateLand } from "@data/mock-properties";
import {
  HouseProperty,
  PropertyType,
} from "@components/website/property/models";
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
  const page_size = Math.max(
    parseInt(searchParams.get("page_size") || "10", 10),
    1
  );

  const price_min =
    searchParams.get("price_min") && Number(searchParams.get("price_min"));
  const price_max =
    searchParams.get("price_max") && Number(searchParams.get("price_max"));
  const sort = searchParams.get("sort");
  const bedrooms = searchParams.get("bedrooms");
  const bathrooms =
    searchParams.get("bathrooms") && Number(searchParams.get("bathrooms"));
  const home_types =
    searchParams.get("home_types") &&
    searchParams.get("home_types")?.split(",");
  const land_types =
    searchParams.get("land_types") &&
    searchParams.get("land_types")?.split(",");

  // Apply filters
  let filtered = properties.filter((p) => {
    let matches = true;

    if (grouping_city) {
      matches =
        matches && p.location?.grouping_city.toLowerCase() === grouping_city;
    }

    if (type) {
      matches = matches && p.type?.toLowerCase() === type;
    }

    if (query) {
      matches = matches && p.title?.toLowerCase().includes(query)!;
    }

    if (price_min) {
      matches = matches && p.price?.getValue()! >= price_min;
    }
    if (price_max) {
      matches = matches && p.price?.getValue()! <= price_max;
    }

    return matches;
  });

  // Filter based on Property Type
  if (type === PropertyType.HOUSE) {
    if (bedrooms && bedrooms !== "any") {
      if (bedrooms === "studio") {
        filtered = filtered.filter((house) => house.bedrooms === 0);
      } else if (typeof bedrooms === "object") {
        const { min, max } = bedrooms;
        filtered = filtered.filter((house) => {
          if (min && (house.bedrooms ?? 0) < min) return false;
          if (max && (house.bedrooms ?? 0) > max) return false;
          return true;
        });
      }
    }

    if (bathrooms && bathrooms > 0) {
      filtered = filtered.filter((house) => (house.bathrooms ?? 0) >= bathrooms!);
    }

    if (home_types && home_types.length > 0) {
      filtered = filtered.filter((house) =>
        home_types!.includes(house?.home_type!)
      );
    }
  }

  if (type === PropertyType.LAND) {
    if (land_types && land_types.length > 0) {
      filtered = filtered.filter((land) =>
        land_types!.includes(land.land_type!)
      );
    }
  }

  // Apply sorting
  switch (sort) {
    case "newest":
      filtered.sort(
        (a, b) =>
          new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
      );
      break;
    case "priceAsc":
      filtered.sort((a, b) => a.price?.getValue()! - b.price?.getValue()!);
      break;
    case "priceDesc":
      filtered.sort((a, b) => b.price?.getValue()! - a.price?.getValue()!);
      break;
    case "plotSize":
      filtered.sort((a, b) => {
        const aSize = a.plot_size?.value!;
        const bSize = b.plot_size?.value!;
        return bSize - aSize;
      });
      break;
    case "lotSize":
      if (type === PropertyType.HOUSE) {
        filtered.sort((a, b) => {
          const aSize = a.exterior_description!.lot_size.value;
          const bSize = b.exterior_description!.lot_size.value;
          return bSize - aSize;
        });
      }
      break;
    case "pricePerSqm":
      filtered.sort(
        (a, b) => b.price_per_sqm?.getValue()! - a.price_per_sqm?.getValue()!
      );
      break;
    default: // recommended
      break;
  }

  // Pagination
  const total = filtered.length;
  const start = page * page_size;
  const paginated = filtered.slice(start, start + page_size);

  // Page response
  const pageResponse = {
    items: paginated as QueryPropertyDto[],
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
