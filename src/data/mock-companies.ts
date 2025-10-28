import { getRandomImages } from "@app/api/unsplash/random/lib/unsplash-util";
import { QueryCompanyDto } from "@components/portal/company/models";
import { QueryCompanyUserDto } from "@components/portal/company/team/models";
import { QueryRoleDto } from "@components/portal/company/team/role/models";
import { UserStatus, UserType } from "@components/user/models";
import { faker } from "@faker-js/faker";
import { users } from "./mock-users";

const system_roles_str = ["Admin", "Accountant", "Legal"];

export async function generateCompany(): Promise<QueryCompanyDto> {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    avatar: (await getRandomImages({ query: "logo", count: 1 }).catch(() => []))?.[0]?.url ?? "/placeholder.jpg",
    date_created: faker.date.past().toISOString(),
  };
}

export async function generateSystemRole(name: string): Promise<QueryRoleDto> {
  return {
    id: faker.string.uuid(),
    name: name,
    description: faker.person.jobDescriptor(),
    system_roles: [name],
    is_system_role: true,
    company_id: faker.string.uuid(), // Just here to certify the code
    date_created: faker.date.past().toISOString(),
  };
}

export async function generateCompanyRole(
  company_id: string,
  system_roles: string[]
): Promise<QueryRoleDto> {
  return {
    id: faker.string.uuid(),
    name: faker.person.jobTitle(),
    description: faker.person.jobDescriptor(),
    system_roles: system_roles,
    is_system_role: false,
    company_id: company_id,
    date_created: faker.date.past().toISOString(),
  };
}

export async function generateCompanyUser(
  company_id: string,
  user_id: string,
  role: string
): Promise<QueryCompanyUserDto> {
  const first_name = faker.person.firstName();
  const last_name = faker.person.lastName();
  return {
    id: faker.string.uuid(),
    user_id: user_id,
    company_id: company_id,
    first_name: first_name,
    last_name: last_name,
    fullname: `${first_name} ${last_name}`,
    email: faker.internet.email(),
    role: role,
    status: faker.helpers.arrayElement([
      UserStatus.ACTIVE,
      UserStatus.DEACTIVATED,
      UserStatus.INACTIVE,
      UserStatus.LOCKED,
      UserStatus.PENDING,
    ]),
    type: UserType.USER,
    avatar: (await getRandomImages({ query: "person", count: 1 }).catch(() => []))?.[0]?.url ?? "/placeholder.jpg",
    date_created: faker.date.past().toISOString(),
  };
}

export let companies: QueryCompanyDto[] = [];
export let systemRoles: QueryRoleDto[] = [];
export let companyRoles: QueryRoleDto[] = [];
export let companyUsers: QueryCompanyUserDto[] = [];

async function initData() {
  // only generate once
  if (companies.length === 0) {
    companies = await Promise.all(
      Array.from({ length: 3 }, () => generateCompany())
    );
  }

  if (systemRoles.length === 0) {
    for (const system_role of system_roles_str) {
      const systemRole = await generateSystemRole(system_role);
      systemRoles.push(systemRole);
    }
  }

  if (companyRoles.length === 0) {
    companyRoles.push(...systemRoles);

    for (const company of companies) {
      // Create Roles
      const thisCompanyRoles = await Promise.all(
        Array.from({ length: 5 }, () =>
          generateCompanyRole(
            company.id!,
            faker.helpers.arrayElements(system_roles_str)
          )
        )
      );
      companyRoles.push(...thisCompanyRoles);

      // Create Users
      for (const user of faker.helpers.arrayElements(users)) {
        const thisCompanyUser = await generateCompanyUser(
          company.id!,
          user.id!,
          faker.helpers.arrayElement(thisCompanyRoles.map((role) => role.name))
        );
        companyUsers.push(thisCompanyUser);
      }
    }
  }
}

// Kick off immediately
initData();
