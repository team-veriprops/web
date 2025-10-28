import {
  CreateTrustNetworkDto,
  QueryTrustNetworkDto,
  SearchTrustNetworkDto,
} from "../models";
import { Page } from "types/models";
import { toQueryParams } from "@lib/utils";
import { HttpClient } from "@lib/FetchHttpClient";

export class TrustNetworkService {
  trust_network_base_url: string;
  constructor(private readonly http: HttpClient) {
    this.trust_network_base_url = "/trust-networks";
  }

  async createTrustNetwork(
    payload: CreateTrustNetworkDto
  ): Promise<QueryTrustNetworkDto> {
    return await this.http.post<CreateTrustNetworkDto>(
      `${this.trust_network_base_url}`,
      payload
    );
  }

  async getTrustNetwork(userId: string): Promise<QueryTrustNetworkDto> {
    return await this.http.get<QueryTrustNetworkDto>(
      `${this.trust_network_base_url}/${userId}`
    );
  }

  async searchTrustNetworkPage(
    payload: SearchTrustNetworkDto
  ): Promise<Page<QueryTrustNetworkDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryTrustNetworkDto>>(
      `${this.trust_network_base_url}?${query}`
    );
  }
}
