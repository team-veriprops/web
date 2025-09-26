'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@3rdparty/ui/button';
import { MapPin, Heart, Share2, Eye, Bed, Bath, Square, Search } from 'lucide-react';

import { PriceFilter } from '@components/website/property/Search/PriceFilter';
import { BedsFilter } from '@components/website/property/Search/BedsFilter';
import { HomeTypeFilter } from '@components/website/property/Search/HomeTypeFilter';
import { LandTypeFilter } from '@components/website/property/Search/LandTypeFilter';
import { SaveSearchDialog } from '@components/website/property/Search/SaveSearchDialog';
import { LayoutSelector } from '@components/website/property/Search/LayoutSelector';
import { SortSelector } from '@components/website/property/Search/SortSelector';
import { FilterChips } from '@components/website/property/Search/FilterChips';

import { useSyncedQueryState } from '@hooks/useSyncedQueryState';
import { useParams } from "next/navigation";
import { Property, PropertyType, QueryPropertyDto, TransactionCurrency } from '@components/website/property/models';
import { mockApi } from '@data/seed';
import { formatMeasurement, formatPrice, getFirstPropertyPhoto, handlePropertyViewDetails } from '@lib/utils';
import { PropertyCard } from '@components/website/property/PropertyCard';
import { usePropertyQueries } from '@components/website/property/usePropertyQueries';
import { usePropertyStore } from '@components/website/property/_usePropertyStore';
import { Page } from 'types/models';
import { usePropertyQueryState } from '@components/website/property/usePropertyStore';
import { useGlobalSettings } from '@stores/useGlobalSettings';

export default function SearchResultsPage() {

  const params = useParams();
  const category = params.category as "houses" | "lands";
  const { settings } = useGlobalSettings();

  const [filters, updateFilters, resetFilters] = usePropertyQueryState();
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

      // Sync filters with store
      useEffect(() => {
        updateFilters({page_size: 8, type: settings.propertyType});
      }, []);

  // Downscroll observer
  useEffect(() => {
    if (!bottomRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) fetchNextPage();
    });
    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [bottomRef.current, hasNextPage, fetchNextPage]);

  // Sync filters with store
  useEffect(() => {
    const propertyType =
      category === 'lands' ? PropertyType.LAND : PropertyType.HOUSE;
    usePropertyStore.getState().updateFilter('type', propertyType);
    usePropertyStore.getState().updateFilter('page_size', 8);
  }, [category]);

  const formatCityName = (cityName: string) =>
    cityName.charAt(0).toUpperCase() + cityName.slice(1);

  const formatTypeName = (typeName: string) => {
    if (!typeName || typeName === 'all') return 'Properties';
    return typeName.charAt(0).toUpperCase() + typeName.slice(1);
  };

  // Flattened data
  const allProperties =
    data?.pages.flatMap((page: Page<QueryPropertyDto>) => page.data) ?? [];







  const handleFilterChange = (key: string, value: any) => {
    updateFilters({ [key]: value });
  };

  const handleRemoveFilter = (key: string) => {
    const updates: any = {};
    if (key === 'price') {
      updates.price_min = undefined;
      updates.price_max = undefined;
    } else {
      updates[key] = key.includes('Types') || key.includes('Docs') || key.includes('stage') || key.includes('zoning') 
        ? [] 
        : key === 'bedrooms' ? 'any' : key === 'bathrooms' ? 0 : undefined;
    }
    updateFilters(updates);
  };

  const handleClearAll = () => {
    resetFilters()
  };

  // const formatPrice = (price: number) => `₦${(price / 1000000).toFixed(0)}M`;

  // ---------- RENDER RESULTS ---------- //
  const renderResults = () => {
    if (filters.layout === 'map') {
      return (
        <motion.div
          layout
          className="flex-1 bg-muted/20 rounded-xl flex items-center justify-center h-[400px]"
        >
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <MapPin className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Map View</h3>
            <p className="text-muted-foreground">Interactive map would be shown here</p>
          </div>
        </motion.div>
      );
    }

    if (filters.layout === 'split') {
      return (
        <motion.div layout className="flex-1 flex gap-4">
          <motion.div layout className="flex-1">
            {renderGrid(true)}
          </motion.div>
          <motion.div
            layout
            className="w-2/5 hidden lg:block bg-muted/20 rounded-xl items-center justify-center"
          >
            <div className="text-center sticky top-22 z-50 bg-accent w-4/5 h-4/5">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Map View</h3>
              <p className="text-muted-foreground">Interactive map</p>
            </div>
          </motion.div>
        </motion.div>
      );
    }

    if (filters.layout === 'list') {
      return (
        <motion.div layout className="space-y-4">
          {allProperties.map((property, index) => (
            <motion.div
              key={index}
              layout
              className="bg-card border border-border rounded-xl p-6 hover:shadow-card-hover transition-all"
            >
              <div className="flex gap-6">
                <div className="w-48 h-32 bg-muted rounded-lg flex-shrink-0">
                  <img
                    src={getFirstPropertyPhoto(property)}
                    alt={property.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{property.title}</h3>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    {property.location.area}, {property.location.city}
                  </p>
                  <div className="flex items-center gap-4 mb-3">
                    {property.type === PropertyType.HOUSE && 'bedrooms' in property && (
                      <>
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{property.bedrooms} beds</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{property.bathrooms} baths</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Square className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{formatMeasurement(property.exterior_description?.lot_size!)}</span>
                        </div>
                      </>
                    )}
                    {category === 'lands' && 'size' in property && (
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatMeasurement(property.plot_size)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(property.price)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatPrice(property.price_per_sqm)}
                      </div>
                    </div>
                    <Button>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      );
    }

    return renderGrid();
  };

  // ---------- GRID RENDER ---------- //
  const renderGrid = (isSplit = false) => (
    <motion.div
      layout
      className={`grid grid-cols-1 md:grid-cols-2  lg:grid-cols-${isSplit ? 2 : 3} xl:grid-cols-${isSplit ? 2 : 4} gap-6`}
    >
      {allProperties.map((property, index) => (
        <div
            key={index}
            className="flex-shrink-0 md:w-75 2xl:w-80"
        >
          <PropertyCard
                property={property}
                onViewDetails={() => handlePropertyViewDetails(property)}
          />
        </div>
      ))}
    </motion.div>
  );

  // ---------- PAGE RENDER ---------- //
  // if (!mounted) return null;
  // if (!category || !['houses', 'lands'].includes(category)) {
  //   return <div>Invalid category</div>;
  // }

  return (
    <div className="sticky top-0 min-h-screen bg-background">
      {/* Sticky Header */}
      {(filters.layout === 'split')?
      ( // TODO: Finish to enable Split layout (feature/search1)
        <div className='flex justify-between'>
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className=" mx-auto px-4 py-4">
              {/* Filter Controls */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <PriceFilter
                    min={filters.price_min}
                    max={filters.price_max}
                    currency={settings.currency}
                    onChange={(min, max) => updateFilters({ price_min: min, price_max: max })}
                  />
                  {category === 'houses' && (
                    <>
                      <BedsFilter
                        bedrooms={filters.bedrooms}
                        bathrooms={filters.bathrooms}
                        onChange={(bedrooms, bathrooms) => updateFilters({ bedrooms, bathrooms })}
                      />
                      <HomeTypeFilter
                        selected={filters.home_types}
                        onChange={(types) => handleFilterChange('home_types', types)}
                      />
                    </>
                  )}
                  {category === 'lands' && (
                    <LandTypeFilter
                      selected={filters.land_types}
                      onChange={(types) => handleFilterChange('land_types', types)}
                    />
                  )}
                  {/* // TODO: Uncomment after UI/UX implementation
                  <FiltersSheet
                    category={category}
                    filters={filters}
                    onChange={(newFilters) => updateFilters(newFilters)}
                    isOpen={isFiltersOpen}
                    onOpenChange={setIsFiltersOpen}
                  /> */}
                  <SaveSearchDialog filters={filters} category={category} />
                </div>
                <div className="flex items-center gap-3">
                  <LayoutSelector
                    selected={filters.layout}
                    onChange={(layout) => handleFilterChange('layout', layout)}
                  />
                </div>
              </div>

              {/* Filter Chips */}
              <div className="mt-4">
                <FilterChips
                  filters={filters}
                  onRemove={handleRemoveFilter}
                  onClearAll={handleClearAll}
                />
              </div>

              {/* Title and Count */}
              <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold">
                    {category === 'houses' ? 'Houses' : 'Lands'} for sale & real estate
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-muted-foreground">
                    {allProperties.length} {allProperties.length === 1 ? 'property' : 'properties'}
                  </p>
                  <SortSelector
                    selected={filters.sort!}
                    onChange={(sort) => handleFilterChange('sort', sort)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='bg-accent'></div>
        </div>
      ):(<div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          {/* Filter Controls */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <PriceFilter
                min={filters.price_min}
                max={filters.price_max}
                currency={settings.currency}
                onChange={(min, max) => updateFilters({ price_min: min, price_max: max })}
              />
              {category === 'houses' && (
                <>
                  <BedsFilter
                    bedrooms={filters.bedrooms}
                    bathrooms={filters.bathrooms}
                    onChange={(bedrooms, bathrooms) => updateFilters({ bedrooms, bathrooms })}
                  />
                  <HomeTypeFilter
                    selected={filters.home_types}
                    onChange={(types) => handleFilterChange('home_types', types)}
                  />
                </>
              )}
              {category === 'lands' && (
                <LandTypeFilter
                  selected={filters.land_types}
                  onChange={(types) => handleFilterChange('land_types', types)}
                />
              )}
              {/* // TODO: Uncomment after UI/UX implementation
              <FiltersSheet
                category={category}
                filters={filters}
                onChange={(newFilters) => updateFilters(newFilters)}
                isOpen={isFiltersOpen}
                onOpenChange={setIsFiltersOpen}
              /> */}
              <SaveSearchDialog filters={filters} category={category} />
            </div>
            <div className="flex items-center gap-3">
              <LayoutSelector
                selected={filters.layout!}
                onChange={(layout) => handleFilterChange('layout', layout)}
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="mt-4">
            <FilterChips
              filters={filters}
              onRemove={handleRemoveFilter}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Title and Count */}
          <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                {category === 'houses' ? 'Houses' : 'Lands'} for sale & real estate
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-muted-foreground">
                {allProperties.length} {allProperties.length === 1 ? 'property' : 'properties'}
              </p>
              <SortSelector
                selected={filters.sort!}
                onChange={(sort) => handleFilterChange('sort', sort)}
              />
            </div>
          </div>
        </div>
      </div>)}
      

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
                  {renderResults()}

                  {/* Bottom sentinel for downscroll */}
                  <div ref={bottomRef}>
                    {isFetchingNextPage && (
                      <p className="text-center">Loading more...</p>
                    )}
                  </div>
                </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
