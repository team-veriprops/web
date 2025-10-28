import { NextRequest, NextResponse } from "next/server";
import { companyUsers, generateCompanyUser } from "@data/mock-companies";
import { CreateCompanyUserDto, QueryCompanyUserDto } from "@components/portal/company/team/models";
import { users } from "@data/mock-users";
// GET all or search/filter

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ company_id: string }> }
) {
  const { company_id } = await params;
  const { searchParams } = new URL(req.url);

  // Query params
  const query = searchParams.get("query")?.toLowerCase();
  const page = Math.max(parseInt(searchParams.get("page") || "0", 10), 0); // zero-indexed
  const page_size = Math.max(
    parseInt(searchParams.get("page_size") || "10", 10),
    1
  );

  // Apply filters
  let filtered = companyUsers.filter((p) => {
    let matches = true;

    if (query) {
      matches = matches && p.fullname.toLowerCase().includes(query);
    }

    if (company_id) {
      matches = matches && p.company_id.toLowerCase().includes(company_id.toLowerCase());
    } else {
      // company_id is mandatory
      matches = false;
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
    items: paginated as QueryCompanyUserDto[],
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
  { params }: { params: Promise<{ company_id: string }> }
) {
  const { company_id } = await params;
  const body: CreateCompanyUserDto = await req.json();

  const user = users.find((user) => user.email === body.email)
  if(!user){
    // TODO: create user
  }
  const fullname= `${user?.first_name} ${user?.last_name}`

  const newCompanyUser: QueryCompanyUserDto = { ...generateCompanyUser(company_id, user?.id!, body.role), ...body, company_id, fullname, user_id: user?.id!};


  companyUsers.push(newCompanyUser);
  return NextResponse.json(newCompanyUser, { status: 201 });
}
