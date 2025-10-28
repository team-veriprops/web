import { MapPin, Heart, Share2, Eye, Bed, Bath, Square } from "lucide-react";

import {
  PropertyType,
  QueryPropertyDto,
} from "@components/website/property/models";
import {
  formatMeasurement,
  formatMoney,
  getFirstPropertyPhoto,
  handlePropertyViewDetails,
} from "@lib/utils";
import { PropertyCard } from "@components/website/property/PropertyCard";
import { usePropertyQueryState } from "../libs/usePropertyStore";
import { motion } from "framer-motion";
import { Button } from "@components/3rdparty/ui/button";
import { useGlobalSettings } from "@stores/useGlobalSettings";
import Image from "next/image";

export default function SearchResultLayoutComponent({
  properties,
}: {
  properties: QueryPropertyDto[];
}) {
  const [filters, updateFilters, resetFilters] = usePropertyQueryState();
  const { settings } = useGlobalSettings();

  // ---------- RENDER RESULTS ---------- //
  const renderResults = () => {
    if (filters.layout === "map") {
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
            <p className="text-muted-foreground">
              Interactive map would be shown here
            </p>
          </div>
        </motion.div>
      );
    }

    if (filters.layout === "split") {
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

    if (filters.layout === "list") {
      return (
        <motion.div layout className="space-y-4">
          {properties.map((property, index) => (
            <motion.div
              key={index}
              layout
              className="bg-card border border-border rounded-xl p-6 hover:shadow-card-hover transition-all"
            >
              <div className="flex gap-6">
                <div className="w-48 h-32 bg-muted rounded-lg flex-shrink-0">
                  <Image
                    src={getFirstPropertyPhoto(property)}
                    alt={property.title!}
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
                    {property?.location?.area}, {property?.location?.city}
                  </p>
                  <div className="flex items-center gap-4 mb-3">
                    {property.type === PropertyType.HOUSE &&
                      "bedrooms" in property && (
                        <>
                          <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {property.bedrooms} beds
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {property.bathrooms} baths
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Square className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {formatMeasurement(
                                property.exterior_description?.lot_size!
                              )}
                            </span>
                          </div>
                        </>
                      )}
                    {settings.propertyType === PropertyType.LAND &&
                      "size" in property && (
                        <div className="flex items-center gap-1">
                          <Square className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatMeasurement(property?.plot_size!)}
                          </span>
                        </div>
                      )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {formatMoney(property?.price!)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatMoney(property?.price_per_sqm!)}
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
      {properties.map((property, index) => (
        <div key={index} className="flex-shrink-0 md:w-75 2xl:w-80">
          <PropertyCard
            property={property}
            onViewDetails={() => handlePropertyViewDetails(property)}
          />
        </div>
      ))}
    </motion.div>
  );
  return <>{renderResults()}</>;
}
