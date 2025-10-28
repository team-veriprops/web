import { NextRequest, NextResponse } from "next/server";
import {
  companyRoles,
  generateCompanyRole,
  systemRoles,
} from "@data/mock-companies";
import {
  CreateRoleDto,
  QueryRoleDto,
} from "@components/portal/company/team/role/models";
// GET all or search/filter

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ company_id: string }> }
) {
  const { company_id } = await params;
  const { searchParams } = new URL(req.url);

  // Query params
  const query = searchParams.get("query")?.toLowerCase();
  const is_system_role = searchParams.get("is_system_role") === "true";
  const page = Math.max(parseInt(searchParams.get("page") || "0", 10), 0); // zero-indexed
  const page_size = Math.max(
    parseInt(searchParams.get("page_size") || "10", 10),
    1
  );

  // Apply filters
  let filtered = companyRoles.filter((p) => {
    let matches = true;

    if (query) {
      matches = matches && p.name.toLowerCase().includes(query);
    }

    if (is_system_role) {
      matches = matches && p.is_system_role === is_system_role;
    }

    if (company_id) {
      matches =
        matches &&
        p.company_id?.toLowerCase().includes(company_id.toLowerCase())!;
    } else {
      // company_id is mandatory
      matches = false;
    }

    return matches;
  });

  filtered.push(...systemRoles);

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
    items: paginated as QueryRoleDto[],
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
export async function POST(
  req: Request,
  { params }: { params: Promise<{ company_id: string }> }
) {
  const { company_id } = await params;
  const body: CreateRoleDto = await req.json();
  const newCompanyRole: QueryRoleDto = {
    ...generateCompanyRole(company_id, body.system_roles),
    ...body,
    company_id,
  };

  companyRoles.push(newCompanyRole);
  return NextResponse.json(newCompanyRole, { status: 201 });
}
