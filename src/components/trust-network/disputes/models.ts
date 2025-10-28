import { BaseQueryDto, PageRequest } from "types/models";
import { KeyValue } from "../referrer/leaderboard/models";
import { UserType } from "@components/user/models";

/**
 * DISPUTE
 */
export interface DisputeBaseDto {
  description: string;
  attachments?: string[];
}

// Create DTO
export interface CreateDisputeDto extends DisputeBaseDto {
  ref_id?: string;
  type: DisputeType;
  sub_type?: string;
  related_tran_id?: string;
}
export interface SearchDisputeDto extends PageRequest, BaseQueryDto {
  status?: DisputeStatus;
}

// Query DTO (combination of Create + PartialUpdate + BaseQuery)
export interface QueryDisputeDto extends CreateDisputeDto, BaseQueryDto {
  status: DisputeStatus;
  raised_by: string;
  conversion_count: number;
  sla: {
    expected_response_hours: number;
    escalate_after_hours?: number;
  };
}

export interface QueryDisputeStatsDto {
  open: number;
  underReview: number;
  escalated: number;
  resolved: number;
  dismissed: number;
  avg_resolution__hours: number;
}

export enum DisputeType {
  EARNING = "Earning",
  REFERRAL = "Referral",
  PROPERTY = "Property",
  PAYMENT = "Payment",
  OTHER = "Other",
}

export enum DisputeStatus {
  OPEN = "Open",
  UNDER_REVIEW = "Under Review",
  ESCALATED = "Escalated",
  RESOLVED = "Resolved",
  DISMISSED = "Dismissed",
}

export interface DisputeStatusDetail {
  key: string;
  title: string;
  value?: number | string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
  bgColor?: string;
  subtitle?: string;
}

export const disputeStatuses: KeyValue[] = [
  { key: "all", value: "All Disputes" },
  { key: "open", value: "Open" },
  { key: "under_review", value: "Under Review" },
  { key: "escalated", value: "Escalated" },
  { key: "resolved", value: "Resolved" },
  { key: "dismissed", value: "Dismissed" },
];

/**
 * DISPUTE CONVERSATION
 */
export interface SearchDisputeConversationDto
  extends PageRequest,
    BaseQueryDto {}
export interface QueryDisputeConversationDto extends BaseQueryDto {
  id: string;
  dispute_id: string;
  sender_fullname: string;
  sender_user_id: string;
  sender_user_type: UserType;
  text: string;
  read_by: string[];
  attachments?: string[];
  typing?: boolean;
}

/**
 * DISPUTE RESOLUTION TIMELINE
 */
export interface SearchDisputeResolutionTimelineDto
  extends PageRequest,
    BaseQueryDto {}
export interface QueryDisputeResolutionTimelineDto extends BaseQueryDto {
  dispute_id: string;
  action: DisputeResolutionAction;
  notes: string;
}

export enum DisputeResolutionAction {
  CREATE = "Dispute created",
  AUTO_ESCALATED = "Automatically escalated (SLA exceeded)",
  MANUAL_ESCALATED = "Escalated to senior team",
  ADMIN_BEGINS_INVESTIGATION = "Admin began investigation",
  CALC_ERROR_CONFIRMED = "Calculation error confirmed",
  RESOLVED = "Resolved - Correction applied",
  DISMISSED = "Dismissed - No error found",
}
