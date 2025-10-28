import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@3rdparty/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@3rdparty/ui/popover";
import { ChevronDown } from "lucide-react";
import { usePropertyQueryState } from "../../libs/usePropertyStore";
import { BedSelection } from "../../models";

const bedOptions = [
  ["any", "Any"],
  ["studio", "Studio"],
  [1, "1"],
  [2, "2"],
  [3, "3"],
  [4, "4"],
  [5, "5+"],
] as const;


export function BedsFilter() {
  const [filters, updateFilters] = usePropertyQueryState();

  const [selectedBeds, setSelectedBeds] = useState<BedSelection>("any");
  const [selectedBaths, setSelectedBaths] = useState<number | undefined>(
    filters.bathrooms
  );
  const [isOpen, setIsOpen] = useState(false);
  const [lastSelectedBed, setLastSelectedBed] = useState<string | number>()

  // sync from filters → local state
  useEffect(() => {
    if (!filters.bedrooms) return;
    if (filters.bedrooms === "any" || filters.bedrooms === "studio") {
      setSelectedBeds(filters.bedrooms);
    } else if (typeof filters.bedrooms === "object") {
      setSelectedBeds(filters.bedrooms!);
    }
  }, [filters.bedrooms]);

  useEffect(() => {
    setSelectedBaths(filters.bathrooms);
  }, [filters.bathrooms]);

  // ----------------------
  // Bed Click Logic
  // ----------------------
  let clickTimer: ReturnType<typeof setTimeout> | null = null;

  const handleBedClick = (value: string | number) => {
    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;
      // Double click
      if (value === "studio") {
        setSelectedBeds("studio");
      } else if (typeof value === "number") {
        setSelectedBeds({ min: value, max: value });
      }
    } else {
      // Single click (wait to see if second click comes)
      clickTimer = setTimeout(() => {
        if (value === "any") {
          setSelectedBeds("any");
        } else if (value === "studio") {
          setSelectedBeds({ min: 0, max: 5 });
        } else if (typeof value === "number") {
          if (selectedBeds === "any" || selectedBeds === "studio") {
            setSelectedBeds({ min: value, max: value });
          } else if (typeof selectedBeds === "object") {
            let min = Math.min(selectedBeds.min, value);
            // const max = selectedBeds.max
            //   ? Math.max(selectedBeds.max, value)
            //   : value;
            let max = value

            if(Number(lastSelectedBed)  > value){
              min = value
              max = Number(lastSelectedBed)
            }
            setSelectedBeds({ min, max });
          } else {
            setSelectedBeds({ min: value, max: value });
          }
        }
        clickTimer = null;
      }, 250); // 250ms window for double click
    }

    setLastSelectedBed(value)
  };

  const handleBathClick = (value: number) => {
    setSelectedBaths(value === selectedBaths ? undefined : value);
  };

  const handleDone = () => {
    updateFilters({ bedrooms: selectedBeds, bathrooms: selectedBaths });
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedBeds("any");
    setSelectedBaths(undefined);
    updateFilters({ bedrooms: "any", bathrooms: undefined });
    setIsOpen(false);
  };

  const displayText = `${(() => {
    if (selectedBeds === "any") return "Any bed";
    if (selectedBeds === "studio") return "Studio";
    if (typeof selectedBeds === "object") {
      if (selectedBeds.min === selectedBeds.max && selectedBeds.max === 1) return `${selectedBeds.min} bed`;
      if (selectedBeds.min === selectedBeds.max) return `${selectedBeds.min} beds`;
      if (selectedBeds.max && selectedBeds.max !== 5) return `${selectedBeds.min}-${selectedBeds.max} beds`;
      return `${selectedBeds.min}+ beds`;
    }
    return "Any bed";
  })()}, ${selectedBaths ? `${selectedBaths}+ bath` : "any bath"}`;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 px-4 justify-between border-border hover:bg-muted/50">
          <span className="font-medium">{displayText}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-6 bg-popover border border-border rounded-2xl shadow-2xl" align="start" sideOffset={8}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="space-y-6">
            {/* Bedrooms */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Bedrooms</h4>
              <div className="grid grid-cols-4 gap-2">
                {bedOptions.map(([val, label]) => (
                  <Button
                    key={val.toString()}
                    variant={
                      (val === "any" && selectedBeds === "any") ||
                      (val === "studio" && selectedBeds === "studio") ||
                      (typeof val === "number" &&
                        typeof selectedBeds === "object" &&
                        val >= selectedBeds.min &&
                        (!selectedBeds.max || val <= selectedBeds.max))
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => handleBedClick(val)}
                    className="h-10"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Bathrooms</h4>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 1.5, 2, 2.5, 3, 4].map((val) => (
                  <Button
                    key={val}
                    variant={selectedBaths === val || (!selectedBaths && val === 0) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleBathClick(val)}
                    className="h-10"
                  >
                    {val === 0 ? "Any" : `${val}+`}
                  </Button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-2">
              <Button variant="ghost" onClick={handleReset} className="text-muted-foreground hover:text-foreground">
                Reset
              </Button>
              <Button onClick={handleDone} className="bg-primary hover:bg-primary-hover">
                Done
              </Button>
            </div>
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
