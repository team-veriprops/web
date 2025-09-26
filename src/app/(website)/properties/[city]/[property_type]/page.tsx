'use client'

import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import { PropertyCard } from '@components/website/property/PropertyCard';
import { Button } from '@3rdparty/ui/button';
import { Badge } from '@3rdparty/ui/badge';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { PropertyType, QueryPropertyDto, type Property } from '@components/website/property/models';
import { useParams } from 'next/navigation';
import { usePropertyQueries } from '@components/website/property/usePropertyQueries';
import { usePropertyStore } from '@components/website/property/_usePropertyStore';
import { Page } from 'types/models';
import { handlePropertyViewDetails } from '@lib/utils';

const CityProperties = () => {
  const params = useParams();
  const city = params.city as string;
  const property_type = params.property_type as string;

  const { useSearchPropertyInfinite } = usePropertyQueries();

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useSearchPropertyInfinite();

  const bottomRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Downscroll observer
  useEffect(() => {
    if (!bottomRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) fetchNextPage();
    });
    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [bottomRef.current, hasNextPage, fetchNextPage]);

  // Upscroll observer
  useEffect(() => {
    if (!topRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasPreviousPage) fetchPreviousPage();
    });
    observer.observe(topRef.current);
    return () => observer.disconnect();
  }, [topRef.current, hasPreviousPage, fetchPreviousPage]);

  // Sync filters with store
  useEffect(() => {
    const propertyType =
      property_type === 'lands' ? PropertyType.LAND : PropertyType.HOUSE;
    usePropertyStore.getState().updateFilter('type', propertyType);
    usePropertyStore.getState().updateFilter('grouping_city', city);
    usePropertyStore.getState().updateFilter('page_size', 8);
  }, [city, property_type]);

  const formatCityName = (cityName: string) =>
    cityName.charAt(0).toUpperCase() + cityName.slice(1);

  const formatTypeName = (typeName: string) => {
    if (!typeName || typeName === 'all') return 'Properties';
    return typeName.charAt(0).toUpperCase() + typeName.slice(1);
  };

  // Flattened data
  const allProperties =
    data?.pages.flatMap((page: Page<QueryPropertyDto>) => page.data) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              {formatTypeName(property_type)} in {formatCityName(city || '')}
            </h1>
          </div>

          <Badge variant="secondary" className="mb-6">
            {allProperties.length} properties found
          </Badge>
        </div>

        {/* Content */}
        {allProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No properties found
              </h3>
              <p className="text-muted-foreground mb-6">
                No {formatTypeName(property_type).toLowerCase()} available in{' '}
                {formatCityName(city || '')} at the moment.
              </p>
              <Link href="/">
                <Button variant="outline">Browse All Properties</Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
          
            {/* Top sentinel for upscroll */}
            <div ref={topRef}>
              {isFetchingPreviousPage && (
                <p className="text-center">Loading previous...</p>
              )}
            </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >

            {allProperties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyCard
                  property={property}
                  onViewDetails={handlePropertyViewDetails}
                />
              </motion.div>
            ))}
          </motion.div>
          

            {/* Bottom sentinel for downscroll */}
            <div ref={bottomRef}>
              {isFetchingNextPage && (
                <p className="text-center">Loading more...</p>
              )}
            </div>
            </>
        )}
      </main>
    </div>
  );
};

export default CityProperties;
