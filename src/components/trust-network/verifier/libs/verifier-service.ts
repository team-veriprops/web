import {
  CreateVerifierDto,
  CreateVerifierResponseDto,
  CreateVerifierResponseUploadsDto,
  QueryVerifierActivityAuditDto,
  QueryVerifierDto,
  QueryVerifierResponseDto,
  QueryVerifierResponseUploadsDto,
  QueryVerifierTaskDto,
  QueryVerifierTaskStatsDto,
  SearchVerifierActivityAuditDto,
  SearchVerifierDto,
  SearchVerifierTaskDto,
} from "../models";
import { Page } from "types/models";
import { toQueryParams } from "@lib/utils";
import { HttpClient } from "@lib/FetchHttpClient";

export class VerifierService {
  verifier_base_url: string;
  constructor(private readonly http: HttpClient) {
    this.verifier_base_url = "/verifiers";
  }

  /**
   * VERIFIER
   */
  async createVerifier(
    payload: CreateVerifierDto
  ): Promise<QueryVerifierDto> {
    return await this.http.post<CreateVerifierDto>(
      `${this.verifier_base_url}`,
      payload
    );
  }

  async searchVerifierPage(
    payload: SearchVerifierDto
  ): Promise<Page<QueryVerifierDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryVerifierDto>>(
      `${this.verifier_base_url}?${query}`
    );
  }

  /**
   * VERIFIER TASK
   */
  async getVerifierTaskStats(
    verifierId: string
  ): Promise<QueryVerifierTaskStatsDto> {
    return await this.http.get<QueryVerifierTaskStatsDto>(
      `${this.verifier_base_url}/${verifierId}/tasks/stats`
    );
  }

  async searchVerifierTaskPage(
    verifierId: string,
    payload: SearchVerifierTaskDto
  ): Promise<Page<QueryVerifierTaskDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryVerifierTaskDto>>(
      `${this.verifier_base_url}/${verifierId}/tasks?${query}`
    );
  }

  /**
   * VERIFIER RESPONSE
   */
  async createVerifierTaskResponse(
    taskId: string,
    payload: CreateVerifierResponseDto
  ): Promise<QueryVerifierResponseDto> {
    return await this.http.post<CreateVerifierResponseDto>(
      `${this.verifier_base_url}/task-response/${taskId}`,
      payload
    );
  }

  async createVerifierTaskResponseUpload(
    taskId: string,
    payload: CreateVerifierResponseUploadsDto
  ): Promise<QueryVerifierResponseUploadsDto> {
    return await this.http.post<QueryVerifierResponseUploadsDto>(
      `${this.verifier_base_url}/task-response/${taskId}/uploads`,
      payload
    );
  }

  async getVerifierTaskResponse(
    taskId: string
  ): Promise<QueryVerifierResponseDto> {
    return await this.http.get<QueryVerifierResponseDto>(
      `${this.verifier_base_url}/task-response/${taskId}`,
    );
  }

  /**
   * VERIFIER ACTIVITY AUDIT
   */
  async searchVerifierActivityAuditPage(
    taskId: string,
    payload: SearchVerifierActivityAuditDto
  ): Promise<Page<QueryVerifierActivityAuditDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryVerifierActivityAuditDto>>(
      `${this.verifier_base_url}/task-response/${taskId}/audit?${query}`
    );
  }
}
