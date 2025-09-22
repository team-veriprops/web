'use client'

// Veriprops Service Card Component
import React, { useState } from 'react';
import { Star, Clock, Eye, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@3rdparty/ui/badge';
import { Button } from '@3rdparty/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@3rdparty/ui/avatar';
import { formatPrice } from '@lib/utils';
import { Service } from '@components/website/property/models';

interface ServiceCardProps {
  service: Service;
  onViewDetails?: (service: Service) => void;
  onBookService?: (service: Service) => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onViewDetails,
  onBookService,
  className = '' 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleViewDetails = () => {
    onViewDetails?.(service);
  };

  const handleBookService = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookService?.(service);
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
          <img
            src={service.images[0]}
            alt={service.title}
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
              <Phone size={32} className="mx-auto mb-2" />
              <span className="text-sm">Service image</span>
            </div>
          </div>
        )}
        
        {!imageLoaded && !imageError && (
          <div className="skeleton absolute inset-0" />
        )}

        {/* Service Type Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-accent/90 text-accent-foreground">
            Service
          </Badge>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 text-muted-foreground flex items-center space-x-1">
            <Star size={12} className="text-yellow-500 fill-current" />
            <span className="text-xs font-medium">{service.rating}</span>
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title & Provider */}
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
            <span className="font-medium">{service.provider}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2">
          {service.short_description}
        </p>

        {/* Service Details */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span>{service.rating} rating</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground">
              {formatPrice(service.price)}
            </span>
            <span className="text-xs text-muted-foreground">
              {service.duration}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {service.provider.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1 group-hover:bg-muted transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            <Eye size={16} className="mr-2" />
            Details
          </Button>
          <Button 
            className="flex-1 btn-accent"
            onClick={handleBookService}
          >
            <Phone size={16} className="mr-2" />
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
