import {
  QueryPurchaseDto,
  SearchPurchaseDto,
} from "../models";
import { Page } from "types/models";
import { toQueryParams } from "@lib/utils";
import { HttpClient } from "@lib/FetchHttpClient";

export class PurchaseService {
  purchase_base_url: string;
  constructor(private readonly http: HttpClient) {
    this.purchase_base_url = "/purchases";
  }


  async searchPurchasePage(
    payload: SearchPurchaseDto
  ): Promise<Page<QueryPurchaseDto>> {
    const query = toQueryParams(payload);
    return await this.http.get<Page<QueryPurchaseDto>>(
      `${this.purchase_base_url}?${query}`
    );
  }
}
