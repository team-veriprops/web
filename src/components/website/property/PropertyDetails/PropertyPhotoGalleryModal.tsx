"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";
import { PropertyAssetPhotoCategory } from "./models";
import { Image } from "@components/website/property/models";

// type Photo = {
//   url: string;
//   category: "All" | "Kitchen" | "Bathroom" | "Bedroom" | "Living" | "Dining";
// };

type Props = {
  photos: Image[];
  initialIndex: number; // the index of the photo clicked from the grid
  initialCategory: PropertyAssetPhotoCategory;
  onClose: () => void;
};

const categories: Image["category"][] = [
  PropertyAssetPhotoCategory.All,
  PropertyAssetPhotoCategory.Kitchen,
  PropertyAssetPhotoCategory.Bathroom,
  PropertyAssetPhotoCategory.Bedroom,
  PropertyAssetPhotoCategory.Living,
  PropertyAssetPhotoCategory.Dining,
  PropertyAssetPhotoCategory.OtherRooms,
  PropertyAssetPhotoCategory.Exterior,
  PropertyAssetPhotoCategory.Amenities,
];

export default function PhotoGalleryModal({ photos, initialIndex, initialCategory, onClose }: Props) {
  // Find the category of the initially clicked photo
  // const initialCategory = photos[initialIndex]?.category ?? PropertyAssetPhotoCategory.All;

  // State for active tab and current index
  const [activeCategory, setActiveCategory] = useState<Image["category"]>(initialCategory);

  // Filtered photos based on tab
  const filteredPhotos = useMemo(() => {
    return activeCategory === PropertyAssetPhotoCategory.All
      ? photos
      : photos.filter((p) => p.category === activeCategory);
  }, [activeCategory, photos]);

  // Figure out where in the filtered list the initial photo is
  // const startingFilteredIndex = useMemo(() => {
  //   if (activeCategory === PropertyAssetPhotoCategory.All) return initialIndex;
  //   const original = photos[initialIndex];
  //   return filteredPhotos.findIndex((p) => p.url === original.url);
  // }, [activeCategory, initialIndex, photos, filteredPhotos]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Navigation
  const prevPhoto = () =>
    setCurrentIndex((i) => (i > 0 ? i - 1 : filteredPhotos.length - 1));
  const nextPhoto = () =>
    setCurrentIndex((i) => (i < filteredPhotos.length - 1 ? i + 1 : 0));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 flex flex-col z-50"
      >
        {/* Top bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/20">
          {/* Tabs */}
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentIndex(0); // reset to start of new category
                }}
                className={`pb-1 border-b-2 ${
                  activeCategory === cat
                    ? "border-white text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                { cat === "All" ? cat + `(${photos.length})` : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center text-white hover:text-gray-300 ml-2">
              <Heart className="w-5 h-5 md:mr-1" /> <span className="hidden md:block">Favorite</span>
            </button>
            <button className="flex items-center text-white hover:text-gray-300">
              <Share2 className="w-5 h-5 md:mr-1" /> <span className="hidden md:block">Share</span>
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium">
              <span className="hidden md:block">Request showing</span>
              <span className="md:hidden">Tour</span>
            </button>
            <button onClick={onClose} className="text-white hover:text-gray-300">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Photo viewer */}
        <div className="flex-1 flex items-center justify-center relative">
          {filteredPhotos.length > 0 && (
            <motion.img
              key={filteredPhotos[currentIndex]?.url}
              src={filteredPhotos[currentIndex]?.url}
              alt=""
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-h-[90vh] max-w-[95vw] object-contain shadow-lg"
            />
          )}

          {/* Navigation arrows */}
          {/* Prev Button */}
          {/* <button
            onClick={prevPhoto}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300"
          >
            ‹
          </button> */}

                  <button
          onClick={prevPhoto}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:text-gray-300 text-white rounded-full p-3"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>


          {/* <button
            onClick={nextPhoto}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300"
          >
            ›
          </button> */}

           {/* Next Button */}
        <button
          onClick={nextPhoto}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:text-gray-300 text-white rounded-full p-3"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        </div>

        {/* Counter */}
        <div className="text-center text-white/80 py-3">
          {currentIndex + 1} / {filteredPhotos.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
