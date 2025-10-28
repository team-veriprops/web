import { Money } from "@components/website/property/models";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  referredBy?: string; // ID of Level 1 inviter
  referrals: string[]; // IDs of direct referrals (Level 1)
  indirectReferrals: string[]; // IDs of indirect referrals (Level 2)
  kycCompleted: boolean;
  joinedAt: string;
  tps: number; // Trust Performance Score (0-100)
  tierId: string;
  wallet: {
    available: number;
    escrow: string[]; // transaction IDs
    transactions: string[]; // all transaction IDs
  };
  disputes: string[]; // dispute IDs
  role: "member" | "admin";
  onboardingCompleted?: boolean;
}

export interface Invite {
  id: string;
  referrerId: string;
  inviteeEmail: string;
  inviteeId?: string; // set when they register
  status: "invited" | "registered" | "verified" | "transacted";
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  listerId: string; // user who listed it
  verified: boolean;
  verifiedAt?: string;
  soldTo?: string; // buyer user ID
  soldAt?: string;
  images?: string[];
}

export interface Transaction {
  id: string;
  type: "commission" | "withdrawal" | "adjustment";
  propertyId?: string;
  buyerId?: string;
  sellerId?: string;
  amount: number;
  currency: string;
  recipientUserId: string;
  source?: "inviteToListSale" | "inviteToBuy" | "indirect";
  level?: "direct" | "indirect";
  ruleVersion: string; // e.g., "v1.0"
  earnedAt: string;
  status: "escrow" | "available" | "withdrawn";
  escrowReleaseDate?: string;
  notes?: string;
  referrerId?: string; // Level 1 referrer
  indirectReferrerId?: string; // Level 2 referrer
  rewardBreakdown?: {
    directReward: number;
    indirectReward: number;
  };
}

export type DisputeType =
  | "Earning"
  | "Referral"
  | "Property"
  | "Payment"
  | "Other";
export type DisputeStatus =
  | "Open"
  | "Under Review"
  | "Escalated"
  | "Resolved"
  | "Dismissed";

export interface DisputeMessage {
  id: string;
  sender: "User" | "Admin" | "System";
  senderId?: string;
  text: string;
  attachments?: string[];
  timestamp: string;
  readBy?: string[];
  typing?: boolean;
}

export interface Dispute {
  id: string;
  type: DisputeType;
  subType?: string;
  relatedTransactionId?: string;
  description: string;
  attachments?: string[];
  status: DisputeStatus;
  raisedBy: string;
  createdAt: string;
  updatedAt: string;
  sla: {
    expectedResponseHours: number;
    raisedAt: string;
    escalateAfterHours?: number;
  };
  conversation: DisputeMessage[];
  resolutionTimeline?: {
    date: string;
    action: string;
    by: string;
    notes?: string;
  }[];
}

export interface Notification {
  id: string;
  type: "dispute_message" | "dispute_status";
  disputeId: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminId: string;
  action: string;
  details: Record<string, unknown>;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  score: number;
  rank: number;
  tier: string;
}

export type TierId =
  | "trust_builder"
  | "verified_connector"
  | "trusted_partner"
  | "veriprops_ambassador"
  | "community_leader"
  | "legacy_partner";

export interface TrustLogEntry {
  date: string;
  change: number;
  reason: string;
}

export interface DashboardUser {
  id: string;
  fullName: string;
  firstName: string;
  email: string;
  referralCode: string;
  tierId: TierId;
  trustScore: number;
  trustLogs: TrustLogEntry[];
  joinedAt: string;
}

export interface WalletTotals {
  available: number;
  escrow: number;
  lifetimeInflow: number;
  lifetimeOutflow: number;
  totalBalance: number;
}

export interface ReferralsSummary {
  directTotal: number;
  indirectTotal: number;
  monthlyTrend: { month: string; value: number }[];
}

export interface ShareRecord {
  id: string;
  emails: string[];
  message: string;
  timestamp: string;
  userId: string;
}

export interface AuditEntry {
  id: string;
  action: string;
  userId: string;
  timestamp: string;
  meta?: any;
}
