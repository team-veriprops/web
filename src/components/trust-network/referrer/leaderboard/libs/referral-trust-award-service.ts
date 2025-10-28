import { QueryReferrerTrustAwardDto, SearchReferrerTrustAwardDto } from "../models";
import { Page } from "types/models";
import { toQueryParams } from "@lib/utils";
import { HttpClient } from "@lib/FetchHttpClient";

export class ReferrerTrustAwardService {
  referral_user_base_url: string;
  constructor(private readonly http: HttpClient) {
    this.referral_user_base_url = "/trust-networks/referrals/leaderboard";
  }

  async getReferrerTrustAwardCategoryWinners(): Promise<QueryReferrerTrustAwardDto[]> {
    return await this.http.get<QueryReferrerTrustAwardDto[]>(
      `${this.referral_user_base_url}/winners`
    );
  }

  async searchReferrerTrustAwardPage(payload: SearchReferrerTrustAwardDto  ): Promise<Page<QueryReferrerTrustAwardDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryReferrerTrustAwardDto>>(
      `${this.referral_user_base_url}?${query}`
    );
  }
}
