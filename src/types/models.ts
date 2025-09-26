export interface BaseQueryDto {
  id?: string;                    // Unique ID
  date_updated?: string;         // ISO Date string (e.g. 2024-07-02T12:34:56Z)
  updated_by?: string;           // Who updated the record
  deleted?: boolean;             // Whether deleted
  date_deleted?: string;         // ISO Date string
  deleted_by?: string;           // Who deleted the record
  date_created?: string;         // ISO Date string
  created_by?: string;           // Who created the record
  version?: number;              // The current version number of the record
}

export interface Page<T> {
  data: T[];               // List of items of type T
  page: number;            // Current page number
  page_size: number;       // Number of items per page
  count: number;           // Number of items returned in this page
  total: number;           // Total number of items available
  prev_page?: number;      // Previous page number, if any
  next_page?: number;      // Next page number, if any
}

export interface PageRequest {
  page?: number;                  // Default: 0
  page_size?: number;            // Default: 10
  query_fields?: string;         // Comma-separated list of return fields
  exact_string_values?: boolean; // Default: true
  order_by?: string;             // e.g. "username asc, firstname desc"
  where?: string;                // e.g. "date_created >="
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  LOCKED = 'LOCKED',
  DEACTIVATED = 'DEACTIVATED',
}

export enum UserPersona {
  GUEST = 'GUEST',
  SELLER = 'SELLER',
  BUYER = 'BUYER',
}

export enum UserType {
  ADMIN = 'A',
  USER = 'U',
}

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
  OTHERS = 'O',
}

export enum Roles {
  SUPER_USER = 'SUPER_USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  ACCOUNTANT = 'ACCOUNTANT',
  SURVEYOR = 'SURVEYOR',
  LAWYER = 'LAWYER',
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  CORRECTIONS_NEEDED = 'corrections_needed',
  UNDER_REVIEW = 'under_review',
  VERIFIED = 'VERIFIED',
  FAILED = 'FAILED',
}


export interface SuccessResponse<T> {
  status: string;          // always "success"
  code: string;            // typically "200"
  message?: string;
  trace_id?: string;
  data?: T;
}

export interface PageDetails {
  title: string;
  description: string;
  active_tab?: string;
}