"use client";

import { Trash2, X } from "lucide-react";
import { useUI } from "@stores/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { useBodyOverflowHidden } from "@hooks/useBodyOverflowHidden";
import { useState } from "react";

export default function PropertyComparisonModal() {
 const [type, setType] = useState<"houses" | "lands">("houses");
 const { isCompareModalOpen, setCompareModalOpen } = useUI();
 // Lock body scroll when modal is open
 useBodyOverflowHidden(isCompareModalOpen);

const attributes = [
    { key: "price", label: "Price" },
    { key: "location", label: "Location" },
    { key: "bedrooms", label: "Bedrooms" },
    { key: "bathrooms", label: "Bathrooms" },
    { key: "size", label: "Size" },
    { key: "year", label: "Year Built" },
  ];

  const [houseProperties, setHouseProperties] = useState([
    {
      id: 1,
      title: "Modern Apartment",
      image:
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600",
      price: "$350,000",
      location: "Lekki, Lagos",
      bedrooms: 3,
      bathrooms: 2,
      size: "1,200 sqft",
      year: 2020,
    },
    {
      id: 2,
      title: "Luxury Villa",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
      price: "$1,200,000",
      location: "Ikoyi, Lagos",
      bedrooms: 5,
      bathrooms: 4,
      size: "4,500 sqft",
      year: 2018,
    },
  ]);

  const [landProperties, setLandProperties] = useState([
    {
      id: 3,
      title: "Beachfront Plot",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600",
      price: "$500,000",
      location: "Victoria Island, Lagos",
      size: "800 sqm",
      year: 2023,
    },
    {
      id: 4,
      title: "Residential Plot",
      image:
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600",
      price: "$120,000",
      location: "Ajah, Lagos",
      size: "600 sqm",
      year: 2022,
    },
  ]);

  const properties = type === "houses" ? houseProperties : landProperties;
  const setProperties = type === "houses" ? setHouseProperties : setLandProperties;

  const clearAll = () => {
    setProperties([]);
    // TODO: Hook into actual logic to remove properties
  };

  const removeProperty = (id: number) => {
    setProperties((prev: any[]) => prev.filter((p) => p.id !== id));
  };
      
  return (
    <AnimatePresence>
      {isCompareModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-55 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white w-full h-full flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Compare Properties</h2>

              <div className="flex items-center gap-2">
                {/* Toggle */}
                <div className="flex rounded-full border border-gray-300 overflow-hidden">
                  <button
                    onClick={() => setType("houses")}
                    className={`px-3 py-1 text-sm font-medium transition-colors duration-200 ${
                      type === "houses"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Houses
                  </button>
                  <button
                    onClick={() => setType("lands")}
                    className={`px-3 py-1 text-sm font-medium transition-colors duration-200 ${
                      type === "lands"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Lands
                  </button>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setCompareModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-auto">
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `200px repeat(${properties.length}, minmax(200px,1fr))`,
                }}
              >
                {/* Top-left cell */}
                <div className="sticky top-0 left-0 z-20 bg-gray-50 border-b border-r flex flex-col justify-between">
                  <button
                    onClick={clearAll}
                    className="flex items-center justify-center gap-1 p-2 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 border-b"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                  <div className="p-2 text-center text-xs font-semibold text-gray-600">
                    Attributes
                  </div>
                </div>

                {/* Property headers */}
                {properties.map((p) => (
                  <div
                    key={p.id}
                    className="sticky top-0 z-10 bg-white border-b border-r"
                  >
                    <div className="relative">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-32 object-cover"
                      />
                      <button
                        onClick={() => removeProperty(p.id)}
                        className="absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-red-50 transition"
                      >
                        <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                      </button>
                    </div>
                    <div className="p-2 text-center font-semibold text-sm">
                      {p.title}
                    </div>
                  </div>
                ))}

       {/* Attribute rows */}
                {attributes.map((attr) => (
                  <div
                    key={attr.key}
                    className="contents group cursor-pointer"
                  >
                    {/* Attribute label column */}
                    <div
                      className="p-3 border-b border-r font-medium text-sm bg-gray-50 sticky left-0 z-10 
                                 group-hover:bg-gray-100 transition-colors duration-200"
                    >
                      {attr.label}
                    </div>
                    {/* Property values */}
                    {properties.map((p) => (
                      <div
                        key={`${p.id}-${attr.key}`}
                        className="p-3 border-b border-r text-sm transition-colors duration-200 group-hover:bg-gray-50"
                      >
                        {p[attr.key as keyof typeof p]}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
