import {
  CreateDisputeDto,
  QueryDisputeConversationDto,
  QueryDisputeDto,
  QueryDisputeResolutionTimelineDto,
  QueryDisputeStatsDto,
  SearchDisputeConversationDto,
  SearchDisputeDto,
  SearchDisputeResolutionTimelineDto,
} from "../models";
import { Page } from "types/models";
import { toQueryParams } from "@lib/utils";
import { HttpClient } from "@lib/FetchHttpClient";

export class DisputeService {
  dispute_base_url: string;
  constructor(private readonly http: HttpClient) {
    this.dispute_base_url = "/disputes";
  }

  async createDispute(userId: string, payload: CreateDisputeDto): Promise<QueryDisputeDto> {
    return await this.http.post<CreateDisputeDto>(
      `${this.dispute_base_url}/${userId}`,
      payload
    );
  }

  async getDisputeStats(userId: string): Promise<QueryDisputeStatsDto> {
    return await this.http.get<QueryDisputeStatsDto>(
      `${this.dispute_base_url}/${userId}/stats`
    );
  }

  async searchDisputePage(
    userId: string,
    payload: SearchDisputeDto
  ): Promise<Page<QueryDisputeDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryDisputeDto>>(
      `${this.dispute_base_url}/${userId}?${query}`
    );
  }

  async searchDisputeConversationPage(
    userId: string,
    disputeId: string,
    payload: SearchDisputeConversationDto
  ): Promise<Page<QueryDisputeConversationDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryDisputeConversationDto>>(
      `${this.dispute_base_url}/${userId}/conversations/${disputeId}?${query}`
    );
  }

  async searchDisputeResolutionTimelinePage(
    userId: string,
    disputeId: string,
    payload: SearchDisputeResolutionTimelineDto
  ): Promise<Page<QueryDisputeResolutionTimelineDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryDisputeResolutionTimelineDto>>(
      `${this.dispute_base_url}/${userId}/resolution-timelines/${disputeId}?${query}`
    );
  }
}
