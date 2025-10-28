import { CreateCompanyUserDto, QueryCompanyUserDto, SearchCompanyUserDto } from "../models";
import { Page } from "types/models";
import { buildPath, toQueryParams } from "@lib/utils";
import { HttpClient } from "@lib/FetchHttpClient";

export class UserService {
  user_base_url: string;
  constructor(private readonly http: HttpClient) {
    this.user_base_url = "/companies/{company_id}/users";
  }

  async createUser(company_id: string, payload: CreateCompanyUserDto): Promise<QueryCompanyUserDto> {
    return await this.http.post<CreateCompanyUserDto>(
      `${buildPath(this.user_base_url, {company_id})}`,
      payload
    );
  }

  async searchUserPage(company_id: string, payload: SearchCompanyUserDto): Promise<Page<QueryCompanyUserDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryCompanyUserDto>>(
      `${buildPath(this.user_base_url, {company_id})}?${query}`
    );
  }
}
