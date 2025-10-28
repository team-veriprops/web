"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { CityPropertyGroup } from "@components/website/property/CityPropertyGroup";
import {
  PropertyType,
  QueryCityGroupedPropertiesDto,
} from "@components/website/property/models";
import { handlePropertyViewDetails } from "@lib/utils";
import { usePropertyQueries } from "./libs/usePropertyQueries";
import { Page } from "types/models";
import { usePropertyStore } from "./libs/usePropertyStore";
import InfiniteScrollTriggerComponent from "@components/ui/InfiniteScrollTriggerComponent";

export default function PropertyListingIndexPage({
  propertyType,
}: {
  propertyType: PropertyType;
}) {
  const { useSearchCityGroupedPropertyInfinite } = usePropertyQueries();
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useSearchCityGroupedPropertyInfinite();

  // Sync filters with store
  useEffect(() => {
    usePropertyStore.getState().updateFilter("page_size", 2);
  }, []);

  // Flatten city groups across all pages
  const allCityGroups: QueryCityGroupedPropertiesDto[] =
    data?.pages.flatMap(
      (page: Page<QueryCityGroupedPropertiesDto>) => page.items
    ) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {allCityGroups.map((cityGroup) => (
            <motion.div
              key={cityGroup.city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {cityGroup.properties.length > 0 && (
                <CityPropertyGroup
                  city={cityGroup.city}
                  properties={cityGroup.properties}
                  type={propertyType}
                  onViewDetails={handlePropertyViewDetails}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        <InfiniteScrollTriggerComponent
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </main>

      {/* Bottom padding */}
      <div className="h-20 md:h-0" />
    </div>
  );
}
