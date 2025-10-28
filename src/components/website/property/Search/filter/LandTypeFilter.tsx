import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@3rdparty/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@3rdparty/ui/popover";
import {
  ChevronDown,
  Home,
  Building2,
  Wheat,
  Factory,
  Waves,
  MapPin,
} from "lucide-react";
import { usePropertyQueryState } from "../../libs/usePropertyStore";
import { LandType } from "../../models";

const landTypes = [
  { id: LandType.RESIDENTIAL, label: "Residential", icon: Home },
  { id: LandType.COMMERCIAL, label: "Commercial", icon: Building2 },
  { id: LandType.AGRICULTURAL, label: "Agricultural", icon: Wheat },
  { id: LandType.INDUSTRIAL, label: "Industrial", icon: Factory },
  { id: LandType.MIXED, label: "Mixed-use", icon: Building2 },
  { id: LandType.ALLOCATION, label: "Government Allocation", icon: MapPin },
  { id: LandType.ESTATE_PLOT, label: "Estate Plot", icon: Home },
  { id: LandType.WATER_FRONT, label: "Waterfront", icon: Waves },
  { id: LandType.CORNER_PIECE, label: "Corner Piece", icon: MapPin },
];

export function LandTypeFilter() {
  const [filters, updateFilters] = usePropertyQueryState();
  const [localSelected, setLocalSelected] = useState<LandType[]>(
    filters.land_types!
  );
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState<string>();

  useEffect(() => {
    setDisplayText(getDisplayText());
  }, [JSON.stringify(filters.land_types)]);

  const handleToggle = (typeId: LandType) => {
    setLocalSelected((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleDone = () => {
    updateFilters({ land_types: localSelected });
    setIsOpen(false);
  };

  const handleReset = () => {
    setLocalSelected([]);
    updateFilters({ land_types: [] });
  };

  const getDisplayText = () => {
    if (filters?.land_types?.length === 0) {
      handleReset();
      return "Land type";
    }
    if (filters?.land_types?.length === 1) {
      const type = landTypes.find((t) => t.id === filters?.land_types?.[0]);
      return type?.label || "Land type";
    }
    return `${filters?.land_types?.length} land types`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 px-4 justify-between border-border hover:bg-muted/50"
        >
          <span className="font-medium">{displayText}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 p-6 bg-popover border border-border rounded-2xl shadow-2xl"
        align="start"
        sideOffset={8}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="space-y-6">
            <h4 className="font-medium text-foreground">Land Type</h4>

            <div className="grid grid-cols-2 gap-3">
              {landTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = localSelected.includes(type.id);

                return (
                  <motion.div
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => handleToggle(type.id)}
                      className={`
                        w-full h-20 p-4 flex flex-col items-center justify-center gap-2
                        border-2 transition-all duration-200
                        ${
                          isSelected
                            ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20"
                            : "border-border hover:border-muted-foreground"
                        }
                      `}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-sm font-medium text-center leading-tight">
                        {type.label}
                      </span>
                      {/* {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                        </motion.div>
                      )} */}
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-2">
              <Button
                variant="ghost"
                onClick={handleReset}
                className="text-muted-foreground hover:text-foreground"
              >
                Reset
              </Button>
              <Button
                onClick={handleDone}
                className="bg-primary hover:bg-primary-hover"
              >
                Done
              </Button>
            </div>
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
