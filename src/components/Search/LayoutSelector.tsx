import React, { useState } from 'react';
import { Button } from '@3rdparty/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@3rdparty/ui/popover';
import { ChevronDown, Grid3X3, List, Map, SplitSquareHorizontal, Check } from 'lucide-react';

interface LayoutSelectorProps {
  selected: 'split' | 'map' | 'grid' | 'list';
  onChange: (layout: 'split' | 'map' | 'grid' | 'list') => void;
}

const layoutOptions = [ // TODO: Enable when feature/search1 is implemented
  // { id: 'split', label: 'Split', icon: SplitSquareHorizontal },
  // { id: 'map', label: 'Map', icon: Map },
  { id: 'grid', label: 'Grid', icon: Grid3X3 },
  // { id: 'list', label: 'List', icon: List },
];

export function LayoutSelector({ selected, onChange }: LayoutSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (layout: 'split' | 'map' | 'grid' | 'list') => {
    onChange(layout);
    setIsOpen(false);
  };

  const selectedOption = layoutOptions.find(option => option.id === selected);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 px-4 justify-between border-border hover:bg-muted/50"
        >
          <div className="flex items-center">
            {selectedOption && <selectedOption.icon className="h-4 w-4 mr-2" />}
            <span className="font-medium">{selectedOption?.label}</span>
          </div>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-48 p-2 bg-popover border border-border rounded-xl shadow-xl" 
        align="end"
        sideOffset={8}
      >
        <div className="space-y-1">
          {layoutOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = option.id === selected;
            
            return (
              <Button
                key={option.id}
                variant="ghost"
                onClick={() => handleSelect(option.id as any)}
                className={`
                  w-full h-10 px-3 justify-between
                  ${isSelected ? 'bg-muted text-foreground' : 'hover:bg-muted/50'}
                `}
              >
                <div className="flex items-center">
                  <Icon className="h-4 w-4 mr-3" />
                  <span className="font-medium">{option.label}</span>
                </div>
                {isSelected && <Check className="h-4 w-4" />}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}