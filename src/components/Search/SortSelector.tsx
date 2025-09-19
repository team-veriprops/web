import React, { useState } from 'react';
import { Button } from '@3rdparty/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@3rdparty/ui/popover';
import { ChevronDown, Check } from 'lucide-react';
import { useGlobalSettings } from '@hooks/useGlobalSettings';
import { PropertyType } from '@components/property/models';

interface SortSelectorProps {
  selected: string;
  onChange: (sort: string) => void;
}

const sortOptions = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'newest', label: 'Newest' },
  { id: 'priceAsc', label: 'Price (low to high)' },
  { id: 'priceDesc', label: 'Price (high to low)' },
  // { id: 'sqm', label: 'Square meters' },
  { id: 'plotSize', label: 'Plot size' },
  { id: 'lotSize', label: 'Lot size' },
  { id: 'pricePerSqm', label: 'Price/Sqm' },
];

export function SortSelector({ selected, onChange }: SortSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useGlobalSettings();

  const handleSelect = (sort: string) => {
    onChange(sort);
    setIsOpen(false);
  };

const filteredSortOptions = sortOptions.filter(sortOption =>
   // Remove 'Lot size' for Land
   !(sortOption.id === "lotSize" && settings.propertyType === PropertyType.LAND)
  )

  const selectedOption = sortOptions.find(option => option.id === selected);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 px-4 justify-between border-border hover:bg-muted/50"
        >
          <span className="font-medium">Sort: {selectedOption?.label}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-56 p-2 bg-popover border border-border rounded-xl shadow-xl" 
        align="end"
        sideOffset={8}
      >
        <div className="space-y-1">
          {filteredSortOptions.map((option) => {
            const isSelected = option.id === selected;
            
            return (
              <Button
                key={option.id}
                variant="ghost"
                onClick={() => handleSelect(option.id)}
                className={`
                  w-full h-10 px-3 justify-between
                  ${isSelected ? 'bg-muted text-foreground' : 'hover:bg-muted/50'}
                `}
              >
                <span className="font-medium">{option.label}</span>
                {isSelected && <Check className="h-4 w-4" />}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}