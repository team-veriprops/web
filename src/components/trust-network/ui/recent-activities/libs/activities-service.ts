import { HttpClient } from "@lib/FetchHttpClient";
import { toQueryParams } from "@lib/utils";
import { QueryActivityEventDto, SearchActivityEventDto } from "../models";
import { Page } from "types/models";

export class ActivityEventService {
  private readonly activities_base_url = "/activities";

  constructor(private readonly http: HttpClient) {}

  async getActivityEvent(userId: string): Promise<QueryActivityEventDto> {
    return await this.http.get<QueryActivityEventDto>(
      `${this.activities_base_url}/${userId}`
    );
  }

  async searchActivityEventPage(
    payload: SearchActivityEventDto
  ): Promise<Page<QueryActivityEventDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryActivityEventDto>>(
      `${this.activities_base_url}?${query}`
    );
  }
}
