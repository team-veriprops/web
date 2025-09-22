import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@3rdparty/ui/button';
import { PropertyCard } from '@components/website/PropertyCard';
import { PropertyType, type Property } from '@components/website/property/models';

interface CityPropertyGroupProps {
  city: string;
  properties: Property[];
  type: PropertyType;
  onViewDetails: (property: Property) => void;
}

export const CityPropertyGroup: React.FC<CityPropertyGroupProps> = ({
  city,
  properties,
  type,
  onViewDetails
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, [properties]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Adjust based on card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (properties.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Header with title and navigation */}
      <div className="flex justify-between items-center mb-6">
        <a
          href={`/properties/${city.toLowerCase()}/${type.toLowerCase()}s`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
          title={`View all ${type.toLowerCase()}s in ${city} in a new page`}
        >
          <h3 className="text-2xl font-bold group-hover:text-primary capitalize transition-colors">
            {type}s in {city}
          </h3>
          <ExternalLink className="h-5 w-5 group-hover:text-primary transition-colors" />
        </a>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Horizontal scrolling container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {properties.map((property) => (
          <div
            key={property.id}
            className="flex-shrink-0 w-80"
          >
            <PropertyCard
              property={property}
              onViewDetails={() => onViewDetails(property)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};