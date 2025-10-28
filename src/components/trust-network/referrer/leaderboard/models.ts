import { Money } from "@components/website/property/models";
import { BaseQueryDto, PageRequest } from "types/models";

export interface SearchReferrerTrustAwardDto extends PageRequest, BaseQueryDto {
  category: ReferrerTrustAwardCategoryKey;
  region?: string;
}

// Query DTO (combination of Create + PartialUpdate + BaseQuery)
export interface QueryReferrerTrustAwardDto extends BaseQueryDto {
  id: string;
  user_id: string;
  category: ReferrerTrustAwardCategoryKey;
  fullname: string;
  avatar?: string;
  tier_name: string;
  tier_key: ReferrerTrustTier;
  trust_score: number;
  added_trust_score: number;
  direct_referral_count: number;
  indirect_referral_count: number;
  amount_earned: Money;
  direct_referrer_sales_count: number;
  direct_referrer_buys_count: number;
  region: string;
  date_last_active: string;
  date_tps_updated: string;
  disputes_count: number;
  has_integrity_badge: boolean;
  rank: number;
}

export enum ReferrerTrustTier {
  TRUST_BUILDER = "trust_builder",
  VERIFIED_CONNECTOR = "verified_connector",
  TRUSTED_PARTNER = "trusted_partner",
  VERIPROPS_AMBASSADOR = "veriprops_ambassador",
  COMMUNITY_LEADER = "community_leader",
  LEGACY_PARTNER = "legacy_partner",
}

export enum ReferrerTrustAwardCategoryKey {
  TOP_TRUST = "top_trust",
  TOP_REFERRERS = "top_referrers",
  TOP_EARNERS = "top_earners",
  MOST_DISPUTE_FREE = "most_dispute_free",
  MOST_IMPROVED = "most_improved",
  HALL_OF_INTEGRITY = "hall_of_integrity",
}

export const referrerStructure = {
  trustScoreWeights: {
    verifiedTrustNetworks: 40,
    verifiedInvites: 25,
    noDisputes: 20,
    kycCompleted: 10,
    longevity: 5,
  },

  tiers: [
    {
      key: ReferrerTrustTier.TRUST_BUILDER,
      name: "Trust Builder",
      minTPS: 0,
      maxTPS: 69,
      multiplier: 1.0,
      visibleAtTPS: 0,
    },
    {
      key: ReferrerTrustTier.VERIFIED_CONNECTOR,
      name: "Verified Connector",
      minTPS: 70,
      maxTPS: 149,
      multiplier: 1.05,
      visibleAtTPS: 60,
    },
    {
      key: ReferrerTrustTier.TRUSTED_PARTNER,
      name: "Trusted Partner",
      minTPS: 150,
      maxTPS: 299,
      multiplier: 1.1,
      visibleAtTPS: 120,
    },
    {
      key: ReferrerTrustTier.VERIPROPS_AMBASSADOR,
      name: "Veriprops Ambassador",
      minTPS: 300,
      maxTPS: 599,
      multiplier: 1.15,
      visibleAtTPS: 250,
    },
    {
      key: ReferrerTrustTier.COMMUNITY_LEADER,
      name: "Community Leader",
      minTPS: 600,
      maxTPS: 999,
      multiplier: 1.2,
      visibleAtTPS: 500,
    },
    {
      key: ReferrerTrustTier.LEGACY_PARTNER,
      name: "Legacy Partner",
      minTPS: 1000,
      maxTPS: 999999,
      multiplier: 1.3,
      visibleAtTPS: 900,
    },
  ],
};

export interface ReferrerTrustAwardCategory {
  key: ReferrerTrustAwardCategoryKey;
  name: string;
  icon: string;
  description: string;
  metricKey: string;
  eligibility?: string;
}

export interface KeyValue{
  key: string;
  value: string;
}
export const regions: KeyValue[] = [
  {key:"all", value: "All Regions"},
  {key:"lagos", value: "Lagos"},
  {key:"abuja", value: "Abuja"},
  {key:"port harcourt", value: "Port Harcourt"},
  {key:"ibadan", value: "Ibadan"},
  {key:"enugu", value: "Enugu"},
]

export const ReferrerTrustAwardCategories: ReferrerTrustAwardCategory[] = [
  {
    key: ReferrerTrustAwardCategoryKey.TOP_TRUST,
    name: "Top Trust Scores",
    icon: "TrendingUp",
    description: "Members with the highest Trust Performance Scores",
    metricKey: "trust_score",
  },
  {
    key: ReferrerTrustAwardCategoryKey.TOP_REFERRERS,
    name: "Top Referrers",
    icon: "Users",
    description: "Members with the most verified referrals",
    metricKey: "direct_referral_count",
  },
  {
    key: ReferrerTrustAwardCategoryKey.TOP_EARNERS,
    name: "Top Earners",
    icon: "DollarSign",
    description: "Members with the highest total earnings",
    metricKey: "amount_earned",
  },
  {
    key: ReferrerTrustAwardCategoryKey.MOST_DISPUTE_FREE,
    name: "Most Dispute-Free",
    icon: "Shield",
    description: "Members with zero disputes and strong activity",
    metricKey: "disputes_count",
    eligibility: "Zero disputes required",
  },
  {
    key: ReferrerTrustAwardCategoryKey.MOST_IMPROVED,
    name: "Most Improved",
    icon: "TrendingUp",
    description: "Members with the highest score gains in 30 days",
    metricKey: "added_trust_score",
  },
  {
    key: ReferrerTrustAwardCategoryKey.HALL_OF_INTEGRITY,
    name: "Hall of Integrity",
    icon: "Award",
    description:
      "Elite members with TPS ≥ 80, zero disputes, and completed KYC",
    metricKey: "has_integrity_badge",
    eligibility: "TPS ≥ 80, zero disputes, KYC verified",
  },
];
