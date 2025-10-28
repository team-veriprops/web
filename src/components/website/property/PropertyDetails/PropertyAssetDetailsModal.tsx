"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Share2, Camera, Bed, Bath, Sofa, Utensils } from "lucide-react";
import PropertyPhotoGalleryModal from "./PropertyPhotoGalleryModal";
import { PropertyAssetPhotoCategory, PropertyAssetTab } from "./models";
// import { PropertyDetails } from "@lib/propertyMockData";
import { PropertyImage, QueryPropertyDto, type Property } from "@components/website/property/models";
import { FloatingNavCard } from "./FloatingNavCard";
import Image from "next/image";

// type Tab = "photos" | "floorplan" | "3dtour" | "streetview" | "redesign";
// type PhotoCategory = "All" | "Kitchen" | "Bathroom" | "Bedroom" | "Living" | "Dining" | "Exterior" | "Amenities";
// type Photo = {
//   id: number;
//   url: string;
//   category: PhotoCategory
// };

export default function PropertyAssetDetailsModal({ onClose, property, activatedTab = PropertyAssetTab.Photos }: { onClose: () => void, property: QueryPropertyDto, activatedTab: PropertyAssetTab }) {
  const [activeTab, setActiveTab] = useState<PropertyAssetTab>(activatedTab);
  const [activeCategory, setActiveCategory] = useState<PropertyAssetPhotoCategory>(PropertyAssetPhotoCategory.All);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [showRequestTourCard, setShowRequestTourCard] = useState(true)
  const [filteredPhotos, setFilteredPhotos] = useState<PropertyImage[]>()

  // const mockPhotos: PropertyAssetPhoto[] = [
  //   { id: 1, url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Kitchen },
  //   { id: 2, url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Kitchen },
  //   { id: 3, url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom },
  //   { id: 4, url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom },
  //   { id: 5, url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Living },
  //   { id: 6, url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Living },
  //   { id: 7, url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Dining },
  //   { id: 8, url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Dining },
  //   { id: 9, url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bedroom },
  //   // ... more photos
  // ];
  
  const categories = [
    { key: PropertyAssetPhotoCategory.All, label: `${PropertyAssetPhotoCategory.All} (${property?.images?.length})`, icon: Camera },
    { key: PropertyAssetPhotoCategory.Kitchen, label: PropertyAssetPhotoCategory.Kitchen, icon: Utensils },
    { key: PropertyAssetPhotoCategory.Bathroom, label: PropertyAssetPhotoCategory.Bathroom, icon: Bath },
    { key: PropertyAssetPhotoCategory.Bedroom, label: PropertyAssetPhotoCategory.Bedroom, icon: Bed },
    { key: PropertyAssetPhotoCategory.Living, label: PropertyAssetPhotoCategory.Living, icon: Sofa },
    { key: PropertyAssetPhotoCategory.Dining, label: PropertyAssetPhotoCategory.Dining, icon: Utensils },
    { key: PropertyAssetPhotoCategory.OtherRooms, label: PropertyAssetPhotoCategory.OtherRooms, icon: Bed },
    { key: PropertyAssetPhotoCategory.Amenities, label: PropertyAssetPhotoCategory.Amenities, icon: Sofa },
    { key: PropertyAssetPhotoCategory.Exterior, label: PropertyAssetPhotoCategory.Exterior, icon: Utensils },
  ] as const;

  // Filter photos based on category
  useEffect(() => {
    const currentFilteredPhotos = filterPhotos(activeCategory)

    setFilteredPhotos(currentFilteredPhotos)

    console.log("activeCategory:  ", activeCategory)
  }, [activeCategory])

  const countCategoryPhotos = (category: PropertyAssetPhotoCategory) => {

    // console.log("category: ", category)
    // console.log("filterPhotos: ", filterPhotos(category).length)
    return filterPhotos(category)?.length
  }

  const filterPhotos = (category: PropertyAssetPhotoCategory) => {
    return category === PropertyAssetPhotoCategory.All ?
    property.images :
    property?.images?.filter((p) => {
      // console.log("activeCategory: ", activeCategory)
      // console.log("p.category: ", p.category, ", activeCategory: ", category)
      return p.category === category
    });
  }

  if(! filteredPhotos){
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-52 bg-white"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b  relative">
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
          {[PropertyAssetTab.Photos, PropertyAssetTab.FloorPlan, PropertyAssetTab.ThreeDtour, PropertyAssetTab.StreetView, PropertyAssetTab.Redesign].map((tab) => (
            <button
              key={tab}
              onClick={() => {setActiveTab(tab as PropertyAssetTab); setShowRequestTourCard([PropertyAssetTab.Photos, PropertyAssetTab.FloorPlan].includes(tab));}}
              className={`pb-2 text-sm font-medium capitalize ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-600 hover:text-black ml-2">
            <Heart className="w-5 h-5 md:mr-1" /> <span className="hidden md:block">Favorite</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-black">
            <Share2 className="w-5 h-5 md:mr-1" /> <span className="hidden md:block">Share</span>
          </button>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X className="w-6 h-6" />
          </button>
        </div>


        <div className={`absolute md:-right-2 xl:right-10 2xl:right-42 top-20 lg:w-100 md:w-80 w-75 p-6 hidden bg-white ${showRequestTourCard && 'md:block'}`}>
          {/* Floating Navigation Card */}
                          <FloatingNavCard property={property!} />
                  {/* <h2 className="text-2xl font-semibold">$899,000</h2>
                  <p className="text-gray-600">4 bd • 2.5 ba • 1,766 sq ft</p>
                  <p className="text-sm text-gray-500 mt-2">
                    3337 Solomon Ln, Alameda, CA 94502
                  </p>
                  <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium">
                    Request showing
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Next available: Today at 12:30 PM
                  </p>*/}
                </div> 
      </div>

      {/* Body */}
      <div className="flex h-[calc(100%-4rem)] overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === PropertyAssetTab.Photos && (
            <motion.div
              key={PropertyAssetTab.Photos}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="flex w-full"
            >
              {/* Left side */}
              <div className="flex-[2] px-2 sm:px-6 py-4 max-w-5xl ml-auto">
                <div className="flex flex-wrap space-x-3 mb-6">
                  {categories.map((cat) => (
                    (countCategoryPhotos(cat?.key)! <= 0 ? null :<button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                        activeCategory === cat.key
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <cat.icon className="w-4 h-4 mr-2" /> {cat.label}
                    </button>)
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4">
                  {filteredPhotos.map((p, index) => (
                    <Image
                      key={index}
                      src={p.url}
                      alt=""
                      onClick={() => setGalleryIndex(index)}
                      className={`${
                        index % 3 === 0 ? "col-span-2 h-140" : "col-span-1 h-68"
                      } bg-gray-200 w-full cursor-pointer rounded-lg`}
                    />
                  ))}
                </div>

                {galleryIndex !== null && (
                  <PropertyPhotoGalleryModal
                    photos={property?.images!}
                    initialIndex={galleryIndex}
                    initialCategory={activeCategory}
                    onClose={() => setGalleryIndex(null)}
                  />
                )}
              </div>

              {/* Right side static card, purposefully left empty */}
              <div className={`flex-[1] border-l max-w-xl hidden md:block`}>
                
              </div>
            </motion.div>
          )}

          {activeTab === PropertyAssetTab.FloorPlan && (
            <motion.div
              key={PropertyAssetTab.FloorPlan}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="flex w-full"
            >
              <div className="flex-[2] px-2 sm:px-6 py-4 max-w-5xl ml-auto">
                <div className="bg-gray-200 h-[600px] rounded-lg flex items-center justify-center">
                  Floor plan image here
                </div>
              </div>
              

              {/* Right side static card, purposefully left empty */}
              <div className={`flex-[1] border-l max-w-xl hidden md:block`}>
                
              </div>
            </motion.div>
          )}

          {activeTab === PropertyAssetTab.ThreeDtour && (
            <motion.div
              key={PropertyAssetTab.ThreeDtour}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="bg-gray-200 w-4/5 h-4/5 rounded-lg flex items-center justify-center">
                3D Tour Viewer
              </div>
            </motion.div>
          )}

          {activeTab === PropertyAssetTab.StreetView && (
            <motion.div
              key={PropertyAssetTab.StreetView}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="bg-gray-200 w-4/5 h-4/5 rounded-lg flex items-center justify-center">
                Google Street View
              </div>
            </motion.div>
          )}

          {activeTab === PropertyAssetTab.Redesign && (
            <motion.div
              key={PropertyAssetTab.Redesign}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="bg-gray-200 w-4/5 h-4/5 rounded-lg flex items-center justify-center">
                Redesign Preview
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
