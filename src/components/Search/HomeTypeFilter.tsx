import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@3rdparty/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@3rdparty/ui/popover';
import { ChevronDown, Home, Building, Castle, Users } from 'lucide-react';

interface HomeTypeFilterProps {
  selected?: string[];
  onChange: (types: string[]) => void;
}

const homeTypes = [
  { id: 'apartment', label: 'Apartment/Flat', icon: Building },
  { id: 'duplex', label: 'Duplex', icon: Home },
  { id: 'bungalow', label: 'Bungalow', icon: Home },
  { id: 'terrace', label: 'Terrace', icon: Home },
  { id: 'detached', label: 'Detached', icon: Home },
  { id: 'semiDetached', label: 'Semi-Detached', icon: Home },
  { id: 'mansion', label: 'Mansion/Luxury', icon: Castle },
  { id: 'shortlet', label: 'Shortlet/Serviced', icon: Users },
];

export function HomeTypeFilter({ selected = [], onChange }: HomeTypeFilterProps) {
  const [localSelected, setLocalSelected] = useState<string[]>(selected);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (typeId: string) => {
    setLocalSelected(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleDone = () => {
    onChange(localSelected);
    setIsOpen(false);
  };

  const handleReset = () => {
    setLocalSelected([]);
    onChange([]);
  };

  const getDisplayText = () => {
    if (localSelected.length === 0) return 'Home type';
    if (localSelected.length === 1) {
      const type = homeTypes.find(t => t.id === localSelected[0]);
      return type?.label || 'Home type';
    }
    return `${localSelected.length} home types`;
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
            <h4 className="font-medium text-foreground">Home Type</h4>
            
            <div className="grid grid-cols-2 gap-3">
              {homeTypes.map((type) => {
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
                        w-full  h-20 p-4 flex flex-col items-center justify-center gap-2
                        border-2 transition-all duration-200
                        ${isSelected 
                          ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-muted-foreground'
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