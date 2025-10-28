import { handlePropertyViewDetails } from "@lib/utils";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { QueryPropertyDto } from "../../models";
import { PropertyCard } from "../../PropertyCard";
import { usePropertyQueries } from "../../libs/usePropertyQueries";
import { usePropertyStore } from "../../_usePropertyStore";
import InfiniteScrollTriggerComponent from "@components/ui/InfiniteScrollTriggerComponent";

export default function RecommendedLatestPropertiesInArea() {
  const { currentProperty } = usePropertyStore();
  const { useRecommendedLatestPropertiesInSameAreaInfinite } =
    usePropertyQueries();

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    status,
  } = useRecommendedLatestPropertiesInSameAreaInfinite(currentProperty?.slug!);

  if (status === "pending") return <p>Loading latest properties...</p>;
  if (status === "error") return <p>Failed to load latest properties.</p>;

  // Flatten results
  const properties: QueryPropertyDto[] =
    data?.pages.flatMap((page) => page.items) ?? [];
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          New Listings in this Area
        </h2>
        <p className="text-muted-foreground">
          Fresh properties recently added to the market
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <div key={index} className="flex-shrink-0 md:w-75 2xl:w-80">
            <PropertyCard
              property={property}
              onViewDetails={() => handlePropertyViewDetails(property)}
            />
          </div>
        ))}
      </div>

      <InfiniteScrollTriggerComponent
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </motion.section>
  );
}
