import { BaseQueryDto, PageRequest } from "types/models";
import { TierId } from "./referrer/models";
import { ReferrerTrustTier } from "./referrer/leaderboard/models";

// Base Interfaces
export interface TrustNetworkBaseDto {
}

// Create DTO
export interface CreateTrustNetworkDto extends TrustNetworkBaseDto {
  user_id: string;
}

// Update DTO (full override)
export interface UpdateTrustNetworkDto extends TrustNetworkBaseDto {}

export interface SearchTrustNetworkDto extends PageRequest, BaseQueryDto {
    
}

// Query DTO (combination of Create + PartialUpdate + BaseQuery)
export interface QueryTrustNetworkDto extends CreateTrustNetworkDto, BaseQueryDto {
  current_r_tier_key: ReferrerTrustTier;
  // referral_code: string;
  current_r_tps: number; // ReferrerTrustPerformancePoint
  next_r_tier_name: string;
  next_r_tier_min_tps: number;
  next_r_tier_progress_percent: number;
  next_r_tier_required_referrals: number;
  current_v_tier_key: TierId;
  current_v_tps: number; // VerifierTrustPerformancePoint
  next_v_tier_name: string;
  next_v_tier_min_tps: number;
  next_v_tier_progress_percent: number;
  next_v_tier_required_verifications: number;
}



export type ProfessionType = 'lawyer' | 'surveyor' | 'field' | 'other' | null;

export type RoleType = 'verifier' | 'referrer' | 'both' | null;