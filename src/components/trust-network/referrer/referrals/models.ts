import { Money } from "@components/website/property/models";
import { BaseQueryDto, PageRequest } from "types/models";
import { ReferrerTrustTier } from "../leaderboard/models";

export interface SearchReferralUserDto extends PageRequest, BaseQueryDto {

}

// Query DTO (combination of Create + PartialUpdate + BaseQuery)
export interface QueryReferralUserDto extends BaseQueryDto {
  id: string;
  referral_code: string;
  fullname: string;
  email: string;
  avatar?: string;
  direct_referral_count: number;
  tier_key: ReferrerTrustTier;
  tier_name: string;
  trust_score: number;
  direct_referrer_code?: string;
  indirect_referrer_code?: string;
  is_active?: boolean;
  contribution_to_direct_referrer: {
    amount: Money;
    sales: number;
    buys: number;
  };
}

export interface QueryReferralUserStatsDto{
    directReferralCount: number;
    indirectReferralCount: number;
    totalAmountEarned: Money
}
