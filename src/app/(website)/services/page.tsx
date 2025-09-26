'use client'

// Veriprops Main Homepage - Property Marketplace
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { PropertyCard } from '@components/website/property/PropertyCard';
import { Skeleton } from '@3rdparty/ui/skeleton';
import { Button } from '@3rdparty/ui/button';
import { Badge } from '@3rdparty/ui/badge';

import { Loader2, Filter, SortAsc, Zap } from 'lucide-react';
import { Navigation, MobileBottomNav } from '@components/website/Navigation';
import { CityPropertyGroup } from '@components/website/property/CityPropertyGroup';
import PreFooterNavigation from '@components/website/footer/PreFooterNavigation';
import Footer from '@components/website/footer/Footer';
import { useWishlist, useCompare, useUI } from '@stores/useStore';
import { mockApi } from 'data/seed';
import { type Property, type Service } from '@components/website/property/models';
import { ServiceCard } from '@components/website/ServiceCard';

interface SearchFilters {
  location: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  verified: boolean;
}

export default function ServicesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    type: 'All',
    minPrice: 0,
    maxPrice: 1000000000,
    verified: false,
  });

  const { searchFilters: uiFilters } = useUI();

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  // Update search filters from UI
  useEffect(() => {
    setSearchFilters(uiFilters);
  }, [uiFilters]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [servicesData] = await Promise.all([
        mockApi.getServices()
      ]);
      
      setServices(servicesData);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyViewDetails = (property: Property) => {
    // TODO: Open property detail modal
    console.log('View property details:', property);
  };

  const handleServiceViewDetails = (service: Service) => {
    // TODO: Open service detail modal
    console.log('View service details:', service);
  };

  const handleServiceBook = (service: Service) => {
    // TODO: Open booking modal
    console.log('Book service:', service);
  };

  const filteredProperties = properties.filter((property: { type: string; }) => {
    if (activeCategory === 'Services') return false;
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Lands') return property.type === 'Land';
    if (activeCategory === 'Houses') return property.type === 'House';
    return true;
  });

  // Group properties by city
  const targetCities = ['Lagos', 'Abuja', 'Enugu', 'Portharcourt', 'Asaba'];
  const groupedProperties = targetCities.reduce((acc, city) => {
    const cityProperties = filteredProperties.filter((property: { location: { city: string; }; }) => 
      property.location.city.toLowerCase().includes(city.toLowerCase())
    );
    if (cityProperties.length > 0) {
      acc[city] = cityProperties;
    }
    return acc;
  }, {} as Record<string, Property[]>);

  const PropertySkeleton = () => (
    <div className="property-card">
      <Skeleton className="aspect-[4/3] rounded-t-xl" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );

  const ErrorState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
          <Zap className="w-8 h-8 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Something went wrong
        </h3>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={loadData} className="btn-primary">
          <Loader2 className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    </motion.div>
  );

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <Filter className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No properties found
        </h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search filters or check back later for new listings.
        </p>
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchFilters({
              location: '',
              type: 'All',
              minPrice: 0,
              maxPrice: 1000000000,
              verified: false,
            });
            setActiveCategory('All');
          }}
        >
          Clear Filters
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation
      <Navigation 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      /> */}


      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Section Header */}
        {/* <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Featured Properties
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {activeCategory === 'All' && 'All Properties & Services'}
            </h2>
          </motion.div>
        </div> */}

        {/* Content */}
        {(
          /* Services Content */
          error ? (
            <ErrorState />
          ) : loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </div>
          ) : services.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="popLayout">
                {services.map((service: Service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onViewDetails={handleServiceViewDetails}
                    onBookService={handleServiceBook}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )
        )}

        {/* Load More Button */}
        {!loading && !error && services.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button variant="outline" size="lg" className="px-8">
              Load More Properties
            </Button>
          </motion.div>
        )}
      </main>

      {/* Mobile Bottom Navigation
      <MobileBottomNav 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      /> */}

      {/* Pre-Footer Navigation */}
      {/* <PreFooterNavigation /> */}

      {/* Footer */}
      {/* <Footer /> */}

      {/* Bottom Padding for Mobile Navigation */}
      {/* <div className="h-20 md:h-0" /> */}
    </div>
  );
};
