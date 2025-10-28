import { QueryReferralUserDto, QueryReferralUserStatsDto, SearchReferralUserDto } from "../models";
import { Page } from "types/models";
import { toQueryParams } from "@lib/utils";
import { HttpClient } from "@lib/FetchHttpClient";

export class ReferralUserService {
  referral_user_base_url: string;
  constructor(private readonly http: HttpClient) {
    this.referral_user_base_url = "/trust-networks/referrals";
  }

  async getReferralUserStats(userId: string): Promise<QueryReferralUserStatsDto> {
    return await this.http.get<QueryReferralUserStatsDto>(
      `${this.referral_user_base_url}/${userId}/stats`
    );
  }

  async searchReferralUserPage(
    userId: string,
    payload: SearchReferralUserDto
  ): Promise<Page<QueryReferralUserDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryReferralUserDto>>(
      `${this.referral_user_base_url}/${userId}?${query}`
    );
  }
}
