import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@3rdparty/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@3rdparty/ui/popover';
import { ChevronDown } from 'lucide-react';

interface BedsFilterProps {
  bedrooms?: { min?: number; max?: number } | 'any' | 'studio';
  bathrooms?: number;
  onChange: (bedrooms?: { min?: number; max?: number } | 'any' | 'studio', bathrooms?: number) => void;
}

const bedOptions: any[][] = [[0, 'Any'], [1, 'Studio'], [2, '1'], [3, '2'], [4, '3'], [5, '4'], [6, '5+']];
const bathOptions: any[][] = [[0, 'Any'], [1, '1+'], [1.5, '1.5+'], [2, '2+'], [2.5, '2.5+'], [3, '3+'], [4, '4+']];

export function BedsFilter({ bedrooms, bathrooms, onChange }: BedsFilterProps) {
  const [selectedBeds, setSelectedBeds] = useState<number[]>([]);
  const [selectedBaths, setSelectedBaths] = useState<number | undefined>(bathrooms);
  const [isOpen, setIsOpen] = useState(false);

  const handleBedClick = (index: number) => {
    if (index === 0) { // Any
      setSelectedBeds([]);
      return;
    }
    
    if (selectedBeds.includes(index)) {
      setSelectedBeds(selectedBeds.filter(b => b !== index));
    } else {
      const newSelection = [...selectedBeds, index].sort((a, b) => a - b);
      setSelectedBeds(newSelection);
    }
  };

  const handleBathClick = (value: number) => {
    setSelectedBaths(value === selectedBaths ? undefined : value);
  };

  const handleDone = () => {
    if (selectedBeds.length === 0) {
      onChange('any', selectedBaths);
    } else if (selectedBeds.includes(1)) { // Studio
      onChange('studio', selectedBaths);
    } else if (selectedBeds.length === 1) {
      const bedCount = selectedBeds[0] === 6 ? 5 : selectedBeds[0] - 1; // 5+ maps to 5
      onChange({ min: bedCount, max: bedCount }, selectedBaths);
    } else {
      const min = selectedBeds[0] === 6 ? 5 : selectedBeds[0] - 1;
      const max = selectedBeds[selectedBeds.length - 1] === 6 ? undefined : selectedBeds[selectedBeds.length - 1] - 1;
      onChange({ min, max }, selectedBaths);
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedBeds([]);
    setSelectedBaths(undefined);
    onChange('any', undefined);
  };

  const getDisplayText = () => {
    const bedText = (() => {
      if (!bedrooms || bedrooms === 'any') return 'Any bed';
      if (bedrooms === 'studio') return 'Studio';
      if (typeof bedrooms === 'object') {
        const { min, max } = bedrooms;
        if (min && min === 1) return `${min} bed`;
        else if (min && max && min === max) return `${min} beds`;
        if (min && max) return `${min}-${max} beds`;
        if (min) return `${min}+ beds`;
        return 'Any bed';
      }
      return 'Any bed';
    })();

    const bathText = (() => {
      if (!bathrooms || bathrooms === 0) return 'any bath';
      return `${bathrooms}+ bath${bathrooms > 1 ? 's' : ''}`;
    })();

    return `${bedText}, ${bathText}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 px-4 justify-between border-border hover:bg-muted/50"
        >
          <span className="font-medium">{getDisplayText()}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-6 bg-popover border border-border rounded-2xl shadow-2xl" 
        align="start"
        sideOffset={8}
      >
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
                {bedOptions.map((option, index) => {
                  const value = option[0];
                  return(
                  <Button
                    key={index}
                    variant={selectedBeds.includes(value) || (index === 0 && selectedBeds.length === 0) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleBedClick(value)}
                    className="h-10"
                  >
                    {option[1]}
                  </Button>
                )})}
              </div>
              {selectedBeds.length > 1 && (
                <p className="text-sm text-muted-foreground">
                  Range: {bedOptions[selectedBeds[0]][1]} to {bedOptions[selectedBeds[selectedBeds.length - 1]][1]}
                </p>
              )}
            </div>

            {/* Bathrooms */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Bathrooms</h4>
              <div className="grid grid-cols-4 gap-2">
                {bathOptions.map((option, index) => {
                  const value = option[0];
                  return (
                    <Button
                      key={index}
                      variant={selectedBaths === value || (index === 0 && !selectedBaths) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleBathClick(value)}
                      className="h-10"
                    >
                      {option[1]}
                    </Button>
                  );
                })}
              </div>
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
