export interface BaseQueryDto {
  id?: string;
  date_updated?: string; // ISO date string format
  updated_by?: string;
  deleted?: boolean;
  date_deleted?: string;
  deleted_by?: string;
  date_created?: string;
  created_by?: string;
  version?: number;
}

export interface SuccessResponse<T> {
  status: string;          // always "success"
  code: string;            // typically "200"
  message?: string;
  trace_id?: string;
  data?: T;
}
