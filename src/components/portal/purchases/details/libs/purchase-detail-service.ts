import { QueryPurchaseDetailDto } from "../models";
import { HttpClient } from "@lib/FetchHttpClient";

export class PurchaseDetailService {
  purchase_base_url: string;
  constructor(private readonly http: HttpClient) {
    this.purchase_base_url = "/purchases";
  }

  async getPurchaseDetail(
    purchase_id: string
  ): Promise<QueryPurchaseDetailDto> {
    return await this.http.get<QueryPurchaseDetailDto>(
      `${this.purchase_base_url}/${purchase_id}`
    );
  }
}
