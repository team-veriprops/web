import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize, Heart, Share2, ArrowLeftRight, ImageIcon } from 'lucide-react';
import { Button } from '@3rdparty/ui/button';
// import { PropertyDetails } from '@lib/propertyMockData';
import Link from 'next/link';
import PropertyAssetDetailsModal from './PropertyAssetDetailsModal';
import { useBodyOverflowHidden } from '@hooks/useBodyOverflowHidden';
import { PropertyAssetTab } from './models';
import { type Property } from '@components/property/models';

interface PhotoGalleryProps {
  property: Property;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ property }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activatedTab, setActivatedTab] = useState<PropertyAssetTab>(PropertyAssetTab.Photos);

  // Lock body scroll when modal is open
  useBodyOverflowHidden(isModalOpen);

  // const categories = [
  //   { id: 'all', label: 'All' },
  //   { id: 'bedroom', label: 'Bedroom' },
  //   { id: 'living', label: 'Living' },
  //   { id: 'kitchen', label: 'Kitchen' },
  //   { id: 'bathroom', label: 'Bathroom' },
  //   { id: 'exterior', label: 'Exterior' }
  // ];

  const handleImageClick = (index: number) => {
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Main Gallery Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      >
        <div className="grid grid-cols-5 grid-rows-2 gap-2 h-115 rounded-lg overflow-hidden relative">
          {/* Main Image */}
          <motion.div
            className="col-span-2 row-span-2 relative group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleImageClick(0)}
          >
            <img
              src={property.images[0].url}
              alt="Main property view"
              className="w-full h-full object-cover property-card-image"
            />
          </motion.div>

          {/* Smaller Images */}
          {property.images.slice(1, 7).map((image, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleImageClick(index + 1)}
            >
              <img
                src={image.url}
                alt={`Property view ${index + 2}`}
                className="w-full h-full object-cover property-card-image"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </motion.div>
          ))}

          <div id="photo-controls" className='absolute bottom-0 left-0 w-full col-span-5 flex justify-between items-center px-4 py-5 bg-gradient-to-t from-black/40 to-transparent'>
            <div className="flex gap-2">
              <Button variant="accent" size="sm" className="bg-accent text-accent-strong hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="https://calendly.com/appodus/30min" target="_blank" rel="noopener noreferrer">
                <ImageIcon className="ml-2 h-5 w-5" />
                Street view
              </Link>
            </Button>
              <Button variant="accent" size="sm" className="bg-accent text-accent-strong hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="https://calendly.com/appodus/30min" target="_blank" rel="noopener noreferrer">
                <ImageIcon className="ml-2 h-5 w-5" />
                3D Walkthrough
              </Link>
            </Button>
            </div>
            <div>
              <Button variant="outline" size="sm" className="bg-accent text-accent-strong hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/">
              <ImageIcon className="ml-2 h-5 w-5" />
                38 photos
              </Link>
            </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal Photo Viewer */}
      {isModalOpen && (
        <PropertyAssetDetailsModal property={property} activatedTab={activatedTab} onClose={() => setIsModalOpen(false)} />
      )}
    
    </>
  );
};