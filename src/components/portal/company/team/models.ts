import { UserStatus, UserType } from "@components/user/models";
import { BaseQueryDto, PageRequest } from "types/models";

// Base Interfaces
export interface CompanyUserBaseDto {}

// Create DTO
export interface CreateCompanyUserDto extends CompanyUserBaseDto {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: UserStatus;
  avatar?: string
}

// Update DTO (full override)
export interface UpdateCompanyUserDto extends CompanyUserBaseDto {}

export interface SearchCompanyUserDto extends PageRequest, BaseQueryDto {
    type?: UserType
}

// Query DTO (combination of Create + PartialUpdate + BaseQuery)
export interface QueryCompanyUserDto extends CreateCompanyUserDto, BaseQueryDto {
  fullname: string;
  user_id: string;
  type?: UserType
  company_id: string;
}
