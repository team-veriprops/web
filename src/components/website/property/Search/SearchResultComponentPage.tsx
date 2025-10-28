"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@3rdparty/ui/button";
import { Search } from "lucide-react";

import { QueryPropertyDto } from "@components/website/property/models";
import { usePropertyQueries } from "@components/website/property/libs/usePropertyQueries";
import { Page } from "types/models";
import { usePropertyQueryState } from "@components/website/property/libs/usePropertyStore";
import SearchFilterControlsComponent from "@components/website/property/Search/filter/SearchFilterControlsComponent";
import SearchResultLayoutComponent from "@components/website/property/Search/SearchResultLayoutComponent";
import InfiniteScrollTriggerComponent from "@components/ui/InfiniteScrollTriggerComponent";

export default function SearchComponentPage() {
  const [filters, updateFilters, resetFilters] = usePropertyQueryState();
  const { useSearchPropertyInfinite } = usePropertyQueries();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchPropertyInfinite();

  // Flattened data
  const allProperties =
    data?.pages.flatMap((page: Page<QueryPropertyDto>) => page.items) ?? [];

  const handleClearAll = () => {
    resetFilters();
  };

  return (
    <div className="sticky top-0 min-h-screen bg-background">
      <SearchFilterControlsComponent propertyCount={allProperties.length} />
      {/* Results */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={filters.layout}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {allProperties.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try widening your search or clearing some filters.
                </p>
                <Button onClick={handleClearAll}>Clear filters</Button>
              </div>
            ) : (
              <>
                <SearchResultLayoutComponent properties={allProperties} />

                <InfiniteScrollTriggerComponent
                  hasNextPage={hasNextPage}
                  fetchNextPage={fetchNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
