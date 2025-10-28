

import { PriceFilter } from "@components/website/property/Search/filter/PriceFilter";
import { BedsFilter } from "@components/website/property/Search/filter/BedsFilter";
import { HomeTypeFilter } from "@components/website/property/Search/filter/HomeTypeFilter";
import { LandTypeFilter } from "@components/website/property/Search/filter/LandTypeFilter";
import { SaveSearchDialog } from "@components/website/property/Search/filter/SaveSearchDialog";
import { LayoutSelector } from "@components/website/property/Search/filter/LayoutSelector";
import { SortSelector } from "@components/website/property/Search/filter/SortSelector";
import { FilterChips } from "@components/website/property/Search/filter/FilterChips";
import { usePropertyQueryState } from "../../libs/usePropertyStore";
import { useGlobalSettings } from "@stores/useGlobalSettings";
import { PropertyType } from "../../models";
import { useEffect } from "react";

export default function SearchFilterControlsComponent({propertyCount}:{propertyCount: number}) {

  const [filters, updateFilters, resetFilters] = usePropertyQueryState();
    const { settings } = useGlobalSettings();

  
  
    // Sync filters with store
    useEffect(() => {
      updateFilters({ page_size: 8, type: settings.propertyType });
    }, []);

    

  const handleFilterChange = (key: string, value: any) => {
    updateFilters({ [key]: value });
  };
  return (
    <>
      {/* Sticky Header */}
      {filters.layout === "split" ? (
        // TODO: Finish to enable Split layout (feature/search1)
        <div className="flex justify-between">
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className=" mx-auto px-4 py-4">
              {/* Filter Controls */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <PriceFilter />
                  {settings.propertyType === PropertyType.HOUSE && (
                    <>
                      <BedsFilter />
                      <HomeTypeFilter />
                    </>
                  )}
                  {settings.propertyType === PropertyType.LAND && <LandTypeFilter />}
                  {/* // TODO: Uncomment after UI/UX implementation
                  <FiltersSheet
                    category={category}
                    filters={filters}
                    onChange={(newFilters) => updateFilters(newFilters)}
                    isOpen={isFiltersOpen}
                    onOpenChange={setIsFiltersOpen}
                  /> */}
                  <SaveSearchDialog filters={filters} />
                </div>
                <div className="flex items-center gap-3">
                  <LayoutSelector
                    selected={filters.layout}
                    onChange={(layout) => handleFilterChange("layout", layout)}
                  />
                </div>
              </div>

              {/* Filter Chips */}
              <div className="mt-4">
                <FilterChips />
              </div>

              {/* Title and Count */}
              <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold">
                    {settings.propertyType === PropertyType.HOUSE ? "Houses" : "Lands"} for sale & real
                    estate
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-muted-foreground">
                    {propertyCount}{" "}
                    {propertyCount === 1 ? "property" : "properties"}
                  </p>
                  <SortSelector
                    selected={filters.sort!}
                    onChange={(sort) => handleFilterChange("sort", sort)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-accent"></div>
        </div>
      ) : (
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4">
            {/* Filter Controls */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <PriceFilter />
                {settings.propertyType === PropertyType.HOUSE && (
                  <>
                    <BedsFilter />
                    <HomeTypeFilter />
                  </>
                )}
                {settings.propertyType === PropertyType.LAND && <LandTypeFilter />}
                {/* // TODO: Uncomment after UI/UX implementation
              <FiltersSheet
                category={category}
                filters={filters}
                onChange={(newFilters) => updateFilters(newFilters)}
                isOpen={isFiltersOpen}
                onOpenChange={setIsFiltersOpen}
              /> */}
                <SaveSearchDialog filters={filters} />
              </div>
              <div className="flex items-center gap-3">
                <LayoutSelector
                  selected={filters.layout!}
                  onChange={(layout) => handleFilterChange("layout", layout)}
                />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="mt-4">
              <FilterChips />
            </div>

            {/* Title and Count */}
            <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold">
                  {settings.propertyType === PropertyType.HOUSE ? "Houses" : "Lands"} for sale & real
                  estate
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-muted-foreground">
                  {propertyCount}{" "}
                  {propertyCount === 1 ? "property" : "properties"}
                </p>
                <SortSelector
                  selected={filters.sort!}
                  onChange={(sort) => handleFilterChange("sort", sort)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
