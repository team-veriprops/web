import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Property } from '@components/website/property/models';
import { mockApi } from '@data/seed';
import { PropertyCard } from '@components/website/PropertyCard';
import { handlePropertyViewDetails } from '@lib/utils';

export const RecommendedProperties = ({slug}: {slug: string}) => {
  
  const [recommendedProperties, setRecommendedProperties] = useState<Property[]>([]);
  const [recommendedNewProperties, setRecommendedNewProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
        loadData();
    }, [slug]);
  
    
  const loadData = async () => {
        try {
          setLoading(true);
          
          const [recommendedData, recommendedNewListData] = await Promise.all([
            mockApi.getRecommended(slug),
            mockApi.getRecommendedNewListing(slug)
          ]);
          
          setRecommendedProperties(recommendedData!);
          setRecommendedNewProperties(recommendedNewListData!);

          console.log('slug:', slug);

          console.log('recommendedData:', recommendedData);
          console.log('recommendedNewListData:', recommendedNewListData);
        } catch (err) {
          console.error('Error loading data:', err);
        } finally {
          setLoading(false);
        }
  };
  return (
    <div className="space-y-8">
      {/* Recommended Properties */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Recommended for You</h2>
          <p className="text-muted-foreground">Properties similar to this one that you might like</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProperties.map((property, index) => (
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
          {/* {mockRecommendedProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group cursor-pointer property-card">
                <div className="aspect-video relative overflow-hidden rounded-t-xl">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover property-card-image"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                  <p className="text-xl font-bold text-primary mb-2">
                    ₦{property.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {property.location}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))} */}
        </div>
      </motion.section>

      {/* New Listings */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">New Listings in this Area</h2>
          <p className="text-muted-foreground">Fresh properties recently added to the market</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedNewProperties.map((property, index) => (
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

          {/* {mockRecommendedProperties.map((property, index) => (
            <motion.div
              key={`new-${property.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group cursor-pointer property-card">
                <div className="aspect-video relative overflow-hidden rounded-t-xl">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover property-card-image"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-md">
                      New
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                  <p className="text-xl font-bold text-primary mb-2">
                    ₦{property.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {property.location}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))} */}
        </div>
      </motion.section>
    </div>
  );
};