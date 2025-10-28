import { handlePropertyViewDetails } from "@lib/utils";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { QueryPropertyDto } from "../../models";
import { PropertyCard } from "../../PropertyCard";
import { usePropertyQueries } from "../../libs/usePropertyQueries";
import { usePropertyStore } from "../../_usePropertyStore";
import InfiniteScrollTriggerComponent from "@components/ui/InfiniteScrollTriggerComponent";

export default function RecommendedSimilarPropertiesInArea() {
  const { currentProperty } = usePropertyStore();
  const { useRecommendedSimilarPropertiesInfinite } = usePropertyQueries();

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    status,
  } = useRecommendedSimilarPropertiesInfinite(currentProperty?.slug!);

  if (status === "pending") return <p>Loading similar properties...</p>;
  if (status === "error") return <p>Failed to load similar properties.</p>;

  // Flatten results
  const properties: QueryPropertyDto[] =
    data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Recommended for You
        </h2>
        <p className="text-muted-foreground">
          Properties similar to this one that you might like
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
