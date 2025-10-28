import { useQuery } from "@tanstack/react-query";
import { QueryPurchaseDetailDto } from "../models";
import { usePurchaseDetailStore } from "./usePurchaseDetailStore";

/**
 * React Query hooks wrapping PurchaseService
 */
export const usePurchaseDetailQueries = () => {
  const { service } = usePurchaseDetailStore();

  const useGetPurchaseDetail = (purchase_id: string) =>
    useQuery<QueryPurchaseDetailDto>({
      queryKey: ["purchase detail", purchase_id] as const,
      queryFn: async (): Promise<QueryPurchaseDetailDto> =>
        service.getPurchaseDetail(purchase_id),
      enabled: !!purchase_id, // only fetch if id exists
      placeholderData: (prev) => prev,
    });

  return {
    useGetPurchaseDetail,
  };
};
