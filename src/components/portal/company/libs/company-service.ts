import { CreateCompanyDto, QueryCompanyDto, SearchCompanyDto } from "../models";
import { Page } from "types/models";
import { toQueryParams } from "@lib/utils";
import { HttpClient } from "@lib/FetchHttpClient";

export class CompanyService {
  company_base_url: string;
  constructor(private readonly http: HttpClient) {
    this.company_base_url = "/companies";
  }

  async createCompany(payload: CreateCompanyDto): Promise<QueryCompanyDto> {
    return await this.http.post<CreateCompanyDto>(
      `${this.company_base_url}`,
      payload
    );
  }

  async searchCompanyPage(payload: SearchCompanyDto): Promise<Page<QueryCompanyDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryCompanyDto>>(
      `${this.company_base_url}?${query}`
    );
  }
}
