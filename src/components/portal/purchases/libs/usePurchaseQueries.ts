import {
  useQueryClient,
  useInfiniteQuery,
  InfiniteData,
  useQuery,
} from "@tanstack/react-query";
import {
  QueryPurchaseDto,
  SearchPurchaseDto,
} from "@components/portal/purchases/models";
import { Page } from "types/models";
import { usePurchaseStore } from "./usePurchaseStore";
import { useShallow } from "zustand/react/shallow";
import { stringifyFilters } from "@lib/utils";

/**
 * React Query hooks wrapping PurchaseService
 */
export const usePurchaseQueries = () => {
  const service = usePurchaseStore((state) => state.service);
  const filters = usePurchaseStore(useShallow((state) => state.filters));

  const normalizedFilters = stringifyFilters(filters);

  

  // Search purchase list (paged)
  const useSearchPurchasePage = () =>
    useQuery<Page<QueryPurchaseDto>>({
      queryKey: ["purchases", normalizedFilters],
      queryFn: async (): Promise<Page<QueryPurchaseDto>> =>
        service.searchPurchasePage(filters as SearchPurchaseDto),
      placeholderData: (prev) => prev,
    });


  // Infinite scroll version of purchase list
  const useSearchPurchaseInfinite = () =>
    useInfiniteQuery<
      Page<QueryPurchaseDto>, // TData
      Error, // TError
      InfiniteData<Page<QueryPurchaseDto>>, // TQueryFnData
      readonly unknown[] // TQueryKey
    >({
      queryKey: ["purchases", normalizedFilters] as const,
      queryFn: async ({ pageParam = 0 }): Promise<Page<QueryPurchaseDto>> =>
        service.searchPurchasePage({
          ...filters,
          page: pageParam,
        } as SearchPurchaseDto),
      getNextPageParam: (lastPage) => lastPage.next_page, // next page number
      getPreviousPageParam: (firstPage) => firstPage.prev_page, // previous page number
      initialPageParam: 0,
    });

  return {
    useSearchPurchasePage,
    useSearchPurchaseInfinite,
  };
};
