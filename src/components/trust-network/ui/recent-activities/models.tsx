import { Money } from "@components/website/property/models";
import { BaseQueryDto, PageRequest } from "types/models";

export interface SearchActivityEventDto extends PageRequest, BaseQueryDto {}

// Query DTO (combination of Create + PartialUpdate + BaseQuery)
export interface QueryActivityEventDto extends BaseQueryDto {
  user_id: string;
  type: "referral" | "transaction" | "tier" | "dispute" | "system";
  title: string;
  description?: string;
  amount?: Money;
  date_created: string;
  related_id?: string;
}
