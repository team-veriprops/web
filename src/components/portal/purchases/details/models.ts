import { Money, PropertyType } from "@components/website/property/models";
import { BaseQueryDto, PageRequest } from "types/models";

// Base Interfaces
export interface PurchaseDetailBaseDto {}

// Create DTO
export interface CreatePurchaseDetailDto extends PurchaseDetailBaseDto {
  // property_id?: string;
}

// Update DTO (full override)
export interface UpdatePurchaseDetailDto extends PurchaseDetailBaseDto {}

export interface SearchPurchaseDetailDto extends PageRequest, BaseQueryDto {
    type?: PropertyType
}

// Query DTO (combination of Create + PartialUpdate + BaseQuery)
export interface QueryPurchaseDetailDto extends CreatePurchaseDetailDto, BaseQueryDto {
  purchase_id: string
  property: PropertySummary;
  buyer: Party;
  seller: Party;
  amount: TransactionAmounts;
  status: TransactionStatus;
  escrow_status: EscrowStatus;
  escrow_ref: string;
  contract_url: string;
  contract_signed: boolean;
  documents: string[];
}


export interface Party {
  name: string;
  email: string;
  phone: string;
}

export interface PropertySummary {
  id: string;
  title: string;
  location: string;
  thumbnail: string;
}

export interface TransactionAmounts {
  total: Money;
  escrow: Money;
  fees: Money;
}

export enum TransactionStatus {
  INITIATED = "initiated",
  PENDING = "pending",
  CONTRACT_SIGNED = "contract_signed",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export enum EscrowStatus {
  AWAITING_FUNDING = "awaiting_funding",
  FUNDS_SECURED = "funds_secured",
  RELEASED = "released",
  REFUNDED = "refunded",
}


export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  icon: string;
}