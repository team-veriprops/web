import { PropertyType } from "@components/website/property/models";

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
  items: T[];               // List of items of type T
  page: number;            // Current page number
  page_size: number;       // Number of items per page
  count: number;           // Number of items returned in this page
  total: number;           // Total number of items available
  total_pages: number;     // Total number of pages for the total data
  prev_page?: number;      // Previous page number, if any
  next_page?: number;      // Next page number, if any
}

export interface PageRequest {
  page?: number;                  // Default: 0
  page_size?: number;            // Default: 10
  // total_page?: number;           // Total record pages
  query_fields?: string;         // Comma-separated list of return fields
  exact_string_values?: boolean; // Default: true
  order_by?: string;             // e.g. "username asc, firstname desc"
  where?: string;                // e.g. "date_created >="
  query?: string;                // e.g A four bedroom duplex in enugu state
}

export interface PageDetails {
  title: string;
  description: string;
  active_tab?: string;
}


export const productsTableTabs: Array<{ value: PropertyType; label: string }> =
  [
    { value: PropertyType.LAND, label: "Lands" },
    { value: PropertyType.HOUSE, label: "Houses" },
    // { value: PropertyType.SERVICE, label: "Services" },
  ] as const;
