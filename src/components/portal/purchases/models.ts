import { Money, PropertyType } from "@components/website/property/models";
import { BaseQueryDto, PageRequest } from "types/models";

// Base Interfaces
export interface PurchaseBaseDto {}

// Create DTO
export interface CreatePurchaseDto extends PurchaseBaseDto {
  // property_id?: string;
}

// Update DTO (full override)
export interface UpdatePurchaseDto extends PurchaseBaseDto {}

export interface SearchPurchaseDto extends PageRequest, BaseQueryDto {
    type: PropertyType
}

// Query DTO (combination of Create + PartialUpdate + BaseQuery)
export interface QueryPurchaseDto extends CreatePurchaseDto, BaseQueryDto {
  type: PropertyType;
  title: string;
  price: Money;
  date: string;
  status: PurchaseStatus;
}


export enum PurchaseStatus{
    PENDING = "pending",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
