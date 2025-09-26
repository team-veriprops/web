import {
  CreatePropertyDto,
  QueryCityGroupedPropertiesDto,
  QueryPropertyDetailsDto,
  QueryPropertyDto,
  SearchPropertyDto,
  UpdatePropertyDto,
} from "./models";
import { Page } from "types/models";
import { toQueryParams } from "@lib/utils";
import { HttpClient } from "@lib/FetchHttpClient";

export class PropertyService {
  property_base_url: string;
  constructor(private readonly http: HttpClient) {
    this.property_base_url = "/properties";
  }

  async createProperty(payload: CreatePropertyDto): Promise<QueryPropertyDto> {
    return await this.http.post<CreatePropertyDto>(
      `${this.property_base_url}`,
      payload
    );
  }

  async updateProperty(
    property_id: string,
    payload: UpdatePropertyDto
  ): Promise<QueryPropertyDto> {
    return await this.http.put<UpdatePropertyDto>(
      `${this.property_base_url}/${property_id}`,
      payload
    );
  }

  async getProperty(property_slug: string): Promise<QueryPropertyDetailsDto> {
    return await this.http.get<QueryPropertyDetailsDto>(
      `${this.property_base_url}/${property_slug}`
    );
  }

  async getRecommendedSimilarProperties(property_slug: string, search: SearchPropertyDto): Promise<Page<QueryPropertyDto>> {
    const query = toQueryParams(search);
    return await this.http.get<Page<QueryPropertyDto>>(
      `${this.property_base_url}/${property_slug}/similar?${query}`
    );
  }

  async getRecommendedLatestPropertiesInSameArea(property_slug: string, search: SearchPropertyDto): Promise<Page<QueryPropertyDto>> {
    const query = toQueryParams(search);
    return await this.http.get<Page<QueryPropertyDto>>(
      `${this.property_base_url}/${property_slug}/latest-in-area?${query}`
    );
  }

  async deleteProperty(property_id: string): Promise<boolean> {
    return await this.http.delete<boolean>(
      `${this.property_base_url}/${property_id}`
    );
  }

  async searchPropertyPage(
    payload: SearchPropertyDto
  ): Promise<Page<QueryPropertyDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryPropertyDto>>(
      `${this.property_base_url}?${query}`
    );
  }

  async searchCityGroupedPropertyPage(
    payload: SearchPropertyDto
  ): Promise<Page<QueryCityGroupedPropertiesDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryCityGroupedPropertiesDto>>(
      `${this.property_base_url}/city-grouped?${query}`
    );
  }
}
