'use client'

// Veriprops Main Homepage - Property Marketplace
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { PropertyCard } from '@components/PropertyCard';
import { Skeleton } from '@3rdparty/ui/skeleton';
import { Button } from '@3rdparty/ui/button';
import { Badge } from '@3rdparty/ui/badge';

import { Loader2, Filter, SortAsc, Zap } from 'lucide-react';
import { Navigation, MobileBottomNav } from '@components/Navigation';
import { ServiceCard } from '@components/ServiceCard';
import { CityPropertyGroup } from '@components/website/CityPropertyGroup';
import PreFooterNavigation from '@components/website/footer/PreFooterNavigation';
import Footer from '@components/website/footer/Footer';
import { useWishlist, useCompare, useUI } from '@stores/useStore';
import { mockApi } from 'data/seed';
import { redirect } from 'next/navigation';
import { PropertyType, type Property, type Service } from '@components/property/models';
import IndexPageListing from '@components/property/IndexPageListing';

interface SearchFilters {
  location: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  verified: boolean;
}

const Index = () => {
  // const [properties, setProperties] = useState<Property[]>([]);
  // const [services, setServices] = useState<Service[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // // const [activeTab, setActiveTab] = useState('properties');
  // // const [activeCategory, setActiveCategory] = useState('houses');
  // const [searchFilters, setSearchFilters] = useState<SearchFilters>({
  //   location: '',
  //   type: 'All',
  //   minPrice: 0,
  //   maxPrice: 1000000000,
  //   verified: false,
  // });

  // const { searchFilters: uiFilters } = useUI();

  // // Load initial data
  // useEffect(() => {
  //   loadData();
  // }, []);

  // // Update search filters from UI
  // useEffect(() => {
  //   setSearchFilters(uiFilters);
  // }, [uiFilters]);

  // // Filter data when filters or category change
  // useEffect(() => {
  //   if (properties.length > 0) {
  //     filterData();
  //   }
  // }, [searchFilters]);

  // const loadData = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
      
  //     const [propertiesData, servicesData] = await Promise.all([
  //       mockApi.getProperties(),
  //       mockApi.getServices()
  //     ]);
      
  //     setProperties(propertiesData);
  //     setServices(servicesData);
  //   } catch (err) {
  //     setError('Failed to load data. Please try again.');
  //     console.error('Error loading data:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const filterData = async () => {
  //   try {
  //     let filters: any = {};
      
  //     if (searchFilters.location) {
  //       filters.location = searchFilters.location;
  //     }
      
  //     filters.type = PropertyType.LAND;
      
  //     if (searchFilters.minPrice > 0) {
  //       filters.minPrice = searchFilters.minPrice;
  //     }
      
  //     if (searchFilters.maxPrice < 1000000000) {
  //       filters.maxPrice = searchFilters.maxPrice;
  //     }

  //     const filteredProperties = await mockApi.getProperties(filters);
      
  //     let finalProperties = filteredProperties;
  //     // if (searchFilters.verified) {
  //     //   finalProperties = filteredProperties.filter(p => p.verified);
  //     // }
      
  //     setProperties(finalProperties);
  //   } catch (err) {
  //     console.error('Error filtering data:', err);
  //   }
  // };

  // const handleSearch = (filters: SearchFilters) => {
  //   setSearchFilters(filters);
  // };

  // // const handleCategoryChange = (category: string) => {
  // //   setActiveCategory(category);
  // //   if (category === 'Services') {
  // //     setActiveTab('services');
  // //   } else {
  // //     setActiveTab('properties');
  // //   }
  // // };

  // const handlePropertyViewDetails = (property: Property) => {
  //   redirect(`/properties/lands/${property.slug}`);
  // };

  // const filteredProperties = properties.filter((property: { type: string; }) => {
  //   return property.type === PropertyType.LAND;
  // });

  // // Group properties by city
  // const targetCities = ['Lagos', 'Abuja', 'Enugu', 'Portharcourt', 'Asaba'];
  // const groupedProperties = targetCities.reduce((acc, city) => {
  //   const cityProperties = filteredProperties.filter((property: { location: { city: string; }; }) => 
  //     property.location.city.toLowerCase().includes(city.toLowerCase())
  //   );
  //   if (cityProperties.length > 0) {
  //     acc[city] = cityProperties;
  //   }
  //   return acc;
  // }, {} as Record<string, Property[]>);

  // const PropertySkeleton = () => (
  //   <div className="property-card">
  //     <Skeleton className="aspect-[4/3] rounded-t-xl" />
  //     <div className="p-4 space-y-3">
  //       <Skeleton className="h-6 w-3/4" />
  //       <Skeleton className="h-4 w-1/2" />
  //       <Skeleton className="h-4 w-full" />
  //       <Skeleton className="h-4 w-full" />
  //       <div className="flex justify-between items-center pt-2">
  //         <Skeleton className="h-6 w-24" />
  //         <Skeleton className="h-6 w-16" />
  //       </div>
  //       <Skeleton className="h-10 w-full" />
  //     </div>
  //   </div>
  // );

  // const ErrorState = () => (
  //   <motion.div
  //     initial={{ opacity: 0, y: 20 }}
  //     animate={{ opacity: 1, y: 0 }}
  //     className="text-center py-16"
  //   >
  //     <div className="max-w-md mx-auto">
  //       <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
  //         <Zap className="w-8 h-8 text-destructive" />
  //       </div>
  //       <h3 className="text-lg font-semibold text-foreground mb-2">
  //         Something went wrong
  //       </h3>
  //       <p className="text-muted-foreground mb-6">{error}</p>
  //       <Button onClick={loadData} className="btn-primary">
  //         <Loader2 className="w-4 h-4 mr-2" />
  //         Try Again
  //       </Button>
  //     </div>
  //   </motion.div>
  // );

  // const EmptyState = () => (
  //   <motion.div
  //     initial={{ opacity: 0, y: 20 }}
  //     animate={{ opacity: 1, y: 0 }}
  //     className="text-center py-16"
  //   >
  //     <div className="max-w-md mx-auto">
  //       <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
  //         <Filter className="w-8 h-8 text-muted-foreground" />
  //       </div>
  //       <h3 className="text-lg font-semibold text-foreground mb-2">
  //         No properties found
  //       </h3>
  //       <p className="text-muted-foreground mb-6">
  //         Try adjusting your search filters or check back later for new listings.
  //       </p>
  //       <Button 
  //         variant="outline" 
  //         onClick={() => {
  //           setSearchFilters({
  //             location: '',
  //             type: 'All',
  //             minPrice: 0,
  //             maxPrice: 1000000000,
  //             verified: false,
  //           });
  //           // setActiveCategory('All');
  //         }}
  //       >
  //         Clear Filters
  //       </Button>
  //     </div>
  //   </motion.div>
  // );

  return (
    <IndexPageListing propertyType={PropertyType.LAND} />
    // <div className="min-h-screen bg-background">
    //   {/* Navigation
    //   <Navigation 
    //     activeCategory={activeCategory}
    //     onCategoryChange={handleCategoryChange}
    //   /> */}


    //   {/* Main Content */}
    //   <main className="container mx-auto px-4 py-12">
    //     {/* Section Header */}
    //     {/* <div className="text-center mb-12">
    //       <motion.div
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.6 }}
    //       >
    //         <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
    //           Featured Properties
    //         </Badge>
    //         <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
    //           {activeCategory === 'All' && 'All Properties & Services'}
    //         </h2>
    //       </motion.div>
    //     </div> */}

    //     {/* Content */}
    //     {(
    //       /* Properties Content */
    //       error ? (
    //         <ErrorState />
    //       ) : loading ? (
    //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    //           {Array.from({ length: 8 }).map((_, index) => (
    //             <PropertySkeleton key={index} />
    //           ))}
    //         </div>
    //       ) : Object.keys(groupedProperties).length === 0 ? (
    //         <EmptyState />
    //       ) : (
    //         <motion.div
    //           initial={{ opacity: 0 }}
    //           animate={{ opacity: 1 }}
    //           transition={{ duration: 0.6 }}
    //         >
    //           <AnimatePresence mode="popLayout">
    //             {Object.entries(groupedProperties).map(([city, cityProperties]) => {
    //               // Separate lands for this city
    //               const lands = cityProperties.filter(p => p.type === PropertyType.LAND);
                  
    //               return (
    //                 <div key={city}>
    //                   {lands.length > 0 && (
    //                     <CityPropertyGroup
    //                       city={city}
    //                       properties={lands}
    //                       type="Land"
    //                       onViewDetails={handlePropertyViewDetails}
    //                     />
    //                   )}
    //                 </div>
    //               );
    //             })}
    //           </AnimatePresence>
    //         </motion.div>
    //       )
    //     )}

    //     {/* Load More Button */}
    //     {!loading && !error && (Object.keys(groupedProperties).length > 0 || services.length > 0) && (
    //       <motion.div
    //         className="text-center mt-12"
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.6, delay: 0.3 }}
    //       >
    //         <Button variant="outline" size="lg" className="px-8">
    //           Load More Properties
    //         </Button>
    //       </motion.div>
    //     )}
    //   </main>

    //   {/* Mobile Bottom Navigation
    //   <MobileBottomNav 
    //     activeCategory={activeCategory}
    //     onCategoryChange={handleCategoryChange}
    //   /> */}

    //   {/* Pre-Footer Navigation */}
    //   {/* <PreFooterNavigation /> */}

    //   {/* Footer */}
    //   {/* <Footer /> */}

    //   {/* Bottom Padding for Mobile Navigation */}
    //   <div className="h-20 md:h-0" />
    // </div>
  );
};

export default Index;
