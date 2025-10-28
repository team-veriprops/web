import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateCompanyDto,
  QueryCompanyDto,
  SearchCompanyDto,
} from "@components/portal/company/models";
import { Page } from "types/models";
import { useCompanyStore } from "./useCompanyStore";
import { useShallow } from "zustand/react/shallow";
import { stringifyFilters } from "@lib/utils";

/**
 * React Query hooks wrapping CompanyService
 */
export const useCompanyQueries = () => {
  const service = useCompanyStore((state) => state.service);
  const filters = useCompanyStore(useShallow((state) => state.filters));
  const queryClient = useQueryClient();
  const normalizedFilters = stringifyFilters(filters);

  const useCreateCompany = () =>
    useMutation({
      mutationFn: (payload: CreateCompanyDto) =>
        service.createCompany(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["company"],
        });
      },
    });

  // Search company list (paged)
  const useSearchCompanyPage = () =>
    useQuery<Page<QueryCompanyDto>>({
      queryKey: ["companies", normalizedFilters],
      queryFn: async (): Promise<Page<QueryCompanyDto>> =>
        service.searchCompanyPage(filters as SearchCompanyDto),
      placeholderData: (prev) => prev,
    });

  return {
    useCreateCompany,
    useSearchCompanyPage,
  };
};
