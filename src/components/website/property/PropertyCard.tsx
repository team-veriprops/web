'use client'

// Veriprops Property Card Component
import React, { useState } from 'react';
import { Heart, GitCompareArrows, MapPin, Bed, Maximize, Shield, Star, Eye, Share2, Bath } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist, useCompare, useToasts } from '@stores/useStore';
import { Badge } from '@3rdparty/ui/badge';
import { Button } from '@3rdparty/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@3rdparty/ui/avatar';
import { PropertyType, QueryPropertyDto } from '@components/website/property/models';
import { formatMoney, getFirstPropertyPhoto } from '@lib/utils';
import Image from 'next/image';

interface PropertyCardProps {
  property: QueryPropertyDto;
  onViewDetails?: (property: QueryPropertyDto) => void;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onViewDetails,
  className = '' 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { toggle: toggleWishlist, isInWishlist } = useWishlist();
  const { toggle: toggleCompare, isInCompare, canAdd } = useCompare();
  const { addToast } = useToasts();

  const isWishlisted = isInWishlist(property.id!);
  const isInCompareList = isInCompare(property.id!);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleWishlist(property.id!);
    
    if (isWishlisted) {
      addToast({
        type: 'info',
        message: `${property.title} removed from wishlist`,
        action: {
          label: 'Undo',
          onClick: () => toggleWishlist(property.id!)
        }
      });
    } else {
      addToast({
        type: 'success',
        message: `${property.title} added to wishlist`
      });
    }
  };

  const handleCompareClick = (checked: boolean | string) => {
    if (!isInCompareList && !canAdd()) {
      addToast({
        type: 'warning',
        message: 'You can only compare up to 3 properties'
      });
      return;
    }
    
    toggleCompare(property.id!);
    
    if (isInCompareList) {
      addToast({
        type: 'info',
        message: `${property.title} removed from comparison`
      });
    } else {
      addToast({
        type: 'success',
        message: `${property.title} added to comparison`
      });
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
  }

  const handleViewDetails = () => {
    onViewDetails?.(property);
  };

  return (
    <motion.div
      className={`property-card group cursor-pointer ${className}`}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      onClick={handleViewDetails}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-xl aspect-[4/3]">
        {!imageError ? (
          <Image
            src={getFirstPropertyPhoto(property)}
            alt={property.title!}
            className={`property-card-image w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <div className="text-muted-foreground text-center">
              <MapPin size={32} className="mx-auto mb-2" />
              <span className="text-sm">Image unavailable</span>
            </div>
          </div>
        )}
        
        {!imageLoaded && !imageError && (
          <div className="skeleton absolute inset-0" />
        )}

        {/* Image Overlay Actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlistClick}
            className="heart-button w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border bg-white/90 border-white/50 hover:bg-white transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart 
              size={16} 
              className={`transition-colors duration-200 ${
                isWishlisted 
                  ? 'text-red-500 heart-filled' 
                  : 'text-muted-foreground'
              }`}
              fill={isWishlisted ? 'currentColor' : 'none'} 
            />
          </motion.button>

          {/* Compare Button */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCompareClick(!isInCompareList);
            }}
            className="compare-button w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border bg-white/90 border-white/50 hover:bg-white transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <GitCompareArrows 
              size={16} 
              className={`transition-colors duration-200 ${
                isInCompareList 
                  ? 'text-blue-500' 
                  : 'text-muted-foreground'
              }`}
            />
          </motion.button>

          {/* Share Button */}
          <motion.button
            onClick={(e) => {
              handleShareClick(e);
            }}
            className="share-button w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border bg-white/90 border-white/50 hover:bg-white transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 
              size={16} 
              className={`transition-colors duration-200 text-muted-foreground`}
            />
          </motion.button>
        </div>

        {/* Verified Badge */}
        {
          // property.verification && property.verification.verified &&
         (
          <div className="absolute top-3 left-3">
            <Badge className="verified-badge">
              <Shield size={12} />
              Verified
            </Badge>
          </div>
        )}

        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-muted-foreground">
            {property.type === PropertyType.HOUSE ? property.home_type : property.land_type}
          </Badge>
        </div>

        {/* Image Count */}
        {property?.images?.length! > 1 && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="bg-black/50 text-white border-0 text-xs">
              +{property?.images?.length! - 1} more
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title & Location */}
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
            <MapPin size={14} />
            <span>{property?.location?.area}, {property?.location?.city}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2">
          {property.short_description}
        </p>

        {/* Property Details */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {property.type === PropertyType.HOUSE && property.bedrooms && (
            <>
              <div className="flex items-center space-x-1">
                <Bed size={14} />
                <span>{property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bath size={14} />
                <span>{property.bathrooms} bath{property?.bathrooms! > 1 ? 's' : ''}</span>
              </div>
            </>
          )}
          <div className="flex items-center space-x-1">
            <Maximize size={14} />
            <span>{property?.plot_size?.value}m²</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({property.reviews_count} review{property.reviews_count !== 1 ? 's' : ''})
          </span>
        </div>

        {/* Price & Owner */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground">
              {formatMoney(property?.price!)}
            </span>
            <span className="text-xs text-muted-foreground">Total price</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={property.owner?.avatar} alt={property.owner?.name} />
              <AvatarFallback className="text-xs">{property.owner?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{property.owner?.name}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
        >
          <Eye size={16} className="mr-2" />
          View Details
        </Button>
      </div>
    </motion.div>
  );
};
