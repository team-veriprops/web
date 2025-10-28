import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateCompanyUserDto,
  QueryCompanyUserDto,
  SearchCompanyUserDto,
} from "@components/portal/company/team/models";
import { Page } from "types/models";
import { useUserStore } from "./useUserStore";
import { useShallow } from "zustand/react/shallow";
import { stringifyFilters } from "@lib/utils";

/**
 * React Query hooks wrapping UserService
 */
export const useUserQueries = () => {
  const service = useUserStore((state) => state.service);
  const filters = useUserStore(useShallow((state) => state.filters));
  const queryClient = useQueryClient();
  const normalizedFilters = stringifyFilters(filters);

  const useCreateUser = (company_id: string) =>
    useMutation({
      mutationFn: (payload: CreateCompanyUserDto) =>
        service.createUser(company_id, payload),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users", company_id],
        });
      },
    });

  // Search user list (paged)
  const useSearchUserPage = (company_id: string) =>
    useQuery<Page<QueryCompanyUserDto>>({
      queryKey: ["users", normalizedFilters, company_id],
      queryFn: async (): Promise<Page<QueryCompanyUserDto>> =>
        service.searchUserPage(company_id, filters as SearchCompanyUserDto),
      placeholderData: (prev) => prev,
      enabled: !!company_id, // only fetch if company_id exists
    });

  return {
    useCreateUser,
    useSearchUserPage,
  };
};
