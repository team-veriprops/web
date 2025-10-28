import { BaseQueryDto, PageRequest } from "types/models";

// Base Interfaces
export interface CompanyBaseDto {
    name: string;
  avatar: string;
}

// Create DTO
export interface CreateCompanyDto extends CompanyBaseDto {
  // property_id?: string;
}

// Update DTO (full override)
export interface UpdateCompanyDto extends CompanyBaseDto {}

export interface SearchCompanyDto extends PageRequest, BaseQueryDto {
    
}

// Query DTO (combination of Create + PartialUpdate + BaseQuery)
export interface QueryCompanyDto extends CreateCompanyDto, BaseQueryDto {

}
