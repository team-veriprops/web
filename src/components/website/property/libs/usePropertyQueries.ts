import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  InfiniteData,
} from "@tanstack/react-query";
import {
  CreatePropertyDto,
  QueryCityGroupedPropertiesDto,
  QueryPropertyDetailsDto,
  QueryPropertyDto,
  SearchPropertyDto,
  UpdatePropertyDto,
} from "@components/website/property/models";
import { Page } from "types/models";
import { usePropertyStore } from "./usePropertyStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { stringifyFilters } from "@lib/utils";

/**
 * React Query hooks wrapping PropertyService
 */
export const usePropertyQueries = () => {
  const service = usePropertyStore((state) => state.service);
  const filters = usePropertyStore(useShallow((state) => state.filters));
  const { setCurrentProperty } = usePropertyStore();

  const queryClient = useQueryClient();

  const normalizedFilters = stringifyFilters(filters);

  // Fetch a single property
  const useGetProperty = (property_slug: string) => {
    const result = useQuery<QueryPropertyDetailsDto>({
      queryKey: ["property", property_slug] as const,
      queryFn: async (): Promise<QueryPropertyDetailsDto> =>
        service.getProperty(property_slug),
      enabled: !!property_slug, // only fetch if id exists
      placeholderData: (prev) => prev,
    });

    useEffect(() => {
      if (result.data) {
        setCurrentProperty(result.data);
      }
    }, [result.status]);

    return result;
  };

  // Create property
  const useCreateProperty = () =>
    useMutation({
      mutationFn: (payload: CreatePropertyDto) =>
        service.createProperty(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["properties"] });
      },
    });

  // Update property
  const useUpdateProperty = () =>
    useMutation({
      mutationFn: ({
        property_id,
        payload,
      }: {
        property_id: string;
        payload: UpdatePropertyDto;
      }) => service.updateProperty(property_id, payload),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["property", variables.property_id],
        });
        queryClient.invalidateQueries({ queryKey: ["properties"] });
      },
    });

  // Delete property
  const useDeleteProperty = () =>
    useMutation({
      mutationFn: (property_id: string) => service.deleteProperty(property_id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["properties"] });
      },
    });

  // Search property list (paged)
  const useSearchPropertyPage = () =>
    useQuery<Page<QueryPropertyDto>>({
      queryKey: ["properties", normalizedFilters],
      queryFn: async (): Promise<Page<QueryPropertyDto>> =>
        service.searchPropertyPage(filters as SearchPropertyDto),
      placeholderData: (prev) => prev,
    });

  // Infinite scroll version of property list
  const useSearchPropertyInfinite = () =>
    useInfiniteQuery<
      Page<QueryPropertyDto>, // TData
      Error, // TError
      InfiniteData<Page<QueryPropertyDto>>, // TQueryFnData
      readonly unknown[] // TQueryKey
    >({
      queryKey: ["properties", normalizedFilters] as const,
      queryFn: async ({ pageParam = 0 }): Promise<Page<QueryPropertyDto>> =>
        service.searchPropertyPage({
          ...filters,
          page: pageParam,
        } as SearchPropertyDto),
      getNextPageParam: (lastPage) => lastPage.next_page, // next page number
      getPreviousPageParam: (firstPage) => firstPage.prev_page, // previous page number
      initialPageParam: 0,
    });

  // // Search grouped by city
  // const useSearchCityGroupedPropertyPage = () =>
  //   useQuery<Page<QueryCityGroupedPropertiesDto>>({
  //     queryKey: ["properties", "city-grouped", filters] as const,
  //     queryFn: async (): Promise<Page<QueryCityGroupedPropertiesDto>> =>
  //       service.searchCityGroupedPropertyPage(filters as SearchPropertyDto),
  //     placeholderData: (prev) => prev,
  //   });

  // Infinite scroll for city-grouped properties (down & up)
  const useSearchCityGroupedPropertyInfinite = () =>
    useInfiniteQuery<
      Page<QueryCityGroupedPropertiesDto>, // TData
      Error, // TError
      InfiniteData<Page<QueryCityGroupedPropertiesDto>>, // TQueryFnData
      readonly unknown[] // TQueryKey
    >({
      queryKey: ["properties", "city-grouped", normalizedFilters] as const,
      queryFn: async ({
        pageParam = 0,
      }): Promise<Page<QueryCityGroupedPropertiesDto>> =>
        service.searchCityGroupedPropertyPage({
          ...filters,
          page: pageParam,
        } as SearchPropertyDto),
      getNextPageParam: (lastPage) => lastPage.next_page, // For downscroll
      getPreviousPageParam: (firstPage) => firstPage.prev_page, // For upscroll
      initialPageParam: 0,
    });

  // USER RECOMMENDATIONS:

  // 🔄 Infinite scroll hook for fetching recommended *similar* properties
  // relative to a given property_slug.
  // Uses pagination from backend (next_page / prev_page).
  const useRecommendedSimilarPropertiesInfinite = (property_slug: string) =>
    useInfiniteQuery<
      Page<QueryPropertyDto>, // Response type
      Error, // Error type
      InfiniteData<Page<QueryPropertyDto>>, // Infinite data wrapper
      readonly unknown[] // Query key type
    >({
      queryKey: [
        "properties",
        property_slug,
        "recommended-similar",
        filters,
      ] as const,
      queryFn: async ({ pageParam = 0 }): Promise<Page<QueryPropertyDto>> =>
        service.getRecommendedSimilarProperties(property_slug, {
          ...filters,
          page: pageParam,
        } as SearchPropertyDto),
      getNextPageParam: (lastPage) => lastPage.next_page, // forward pagination
      getPreviousPageParam: (firstPage) => firstPage.prev_page, // backward pagination
      initialPageParam: 0,
    });

  // 🔄 Infinite scroll hook for fetching recommended *latest properties in same area*
  // relative to a given property_slug.
  // Also uses backend pagination (next_page / prev_page).
  const useRecommendedLatestPropertiesInSameAreaInfinite = (
    property_slug: string
  ) =>
    useInfiniteQuery<
      Page<QueryPropertyDto>,
      Error,
      InfiniteData<Page<QueryPropertyDto>>,
      readonly unknown[]
    >({
      queryKey: [
        "properties",
        property_slug,
        "recommended-latest-in-area",
        filters,
      ] as const,
      queryFn: async ({ pageParam = 0 }): Promise<Page<QueryPropertyDto>> =>
        service.getRecommendedLatestPropertiesInSameArea(property_slug, {
          ...filters,
          page: pageParam,
        } as SearchPropertyDto),
      getNextPageParam: (lastPage) => lastPage.next_page,
      getPreviousPageParam: (firstPage) => firstPage.prev_page,
      initialPageParam: 0,
    });

  return {
    useGetProperty,
    useCreateProperty,
    useUpdateProperty,
    useDeleteProperty,
    useSearchPropertyPage,
    useSearchPropertyInfinite,
    useSearchCityGroupedPropertyInfinite,
    useRecommendedSimilarPropertiesInfinite,
    useRecommendedLatestPropertiesInSameAreaInfinite,
  };
};
