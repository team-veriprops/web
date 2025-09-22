'use client'

import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import { PropertyCard } from '@components/website/PropertyCard';
import { mockApi } from '@data/seed';
import { Button } from '@3rdparty/ui/button';
import { Badge } from '@3rdparty/ui/badge';
import { Skeleton } from '@3rdparty/ui/skeleton';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { type Property } from '@components/website/property/models';
import { useParams } from 'next/navigation';

const CityProperties = () => {
  
  const params = useParams();
  const city = params.city as string;
  const property_type = params.property_type as string;
  const [properties, setProperties] = useState<Property[]>([]);
  // const [loading, setLoading] = useState(true);

   useEffect(() => {
    loadCityProperties();
  }, [city, property_type]);

  const loadCityProperties = async () => {
    try {
      const allProperties = await mockApi.getProperties();
      
      let filtered = allProperties.filter(property =>
        property.location.city.toLowerCase().includes(city?.toLowerCase() || '')
      );

      filtered = filtered.filter(property =>
          property.type.toLowerCase() === property_type.toLowerCase().slice(0, -1)
        );

      setProperties(filtered);
    } catch (error) {
      console.error('Error loading city properties:', error);
    }
  };

  const handlePropertyViewDetails = (property: Property) => {
    console.log('View property details:', property);
  };

  const formatCityName = (cityName: string) => {
    return cityName.charAt(0).toUpperCase() + cityName.slice(1);
  };

  const formatTypeName = (typeName: string) => {
    if (!typeName || typeName === 'all') return 'Properties';
    return typeName.charAt(0).toUpperCase() + typeName.slice(1);
  };

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

  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}
      
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
            {properties.length} properties found
          </Badge>
        </div>

        {/* Content */}
        {properties.length === 0 ? (
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
                No {formatTypeName(property_type).toLowerCase()} available in {formatCityName(city || '')} at the moment.
              </p>
              <Link href="/">
                <Button variant="outline">
                  Browse All Properties
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {properties.map((property) => (
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
        )}
      </main>
    </div>
  );
};

export default CityProperties;