import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@3rdparty/ui/button';
import { Input } from '@3rdparty/ui/input';
import { Checkbox } from '@3rdparty/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@3rdparty/ui/dialog';
import { Heart, Bookmark } from 'lucide-react';
import { useToast } from '@hooks/use-toast';
import { useGlobalSettings } from '@stores/useGlobalSettings';
import { PropertyType } from '../../models';

interface SaveSearchDialogProps {
  filters: any;
  hasChanges?: boolean;
}

export function SaveSearchDialog({ filters, hasChanges = false }: SaveSearchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [emailUpdates, setEmailUpdates] = useState(false);
  const { toast } = useToast();
    const { settings } = useGlobalSettings();

  const handleSave = () => {
    if (!searchName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your search.",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    const newSearch = {
      id: Date.now().toString(),
      name: searchName,
      category: settings.propertyType,
      filters,
      emailUpdates,
      createdAt: new Date().toISOString()
    };
    
    savedSearches.push(newSearch);
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));

    toast({
      title: "Search saved",
      description: `"${searchName}" has been saved to your searches.`,
    });

    setIsOpen(false);
    setSearchName('');
    setEmailUpdates(false);
  };

  const getSuggestedName = () => {
    const parts = [];
    
    if (filters.price_min || filters.price_max) {
      if (filters.price_min && filters.price_max) {
        parts.push(`₦${(filters.price_min / 1000000).toFixed(0)}M-${(filters.price_max / 1000000).toFixed(0)}M`);
      } else if (filters.price_min) {
        parts.push(`₦${(filters.price_min / 1000000).toFixed(0)}M+`);
      } else {
        parts.push(`Under ₦${(filters.price_max / 1000000).toFixed(0)}M`);
      }
    }
    
    if (settings.propertyType === PropertyType.HOUSE) {
      if (filters.beds && filters.beds !== 'any') {
        if (filters.beds === 'studio') {
          parts.push('Studio');
        } else if (typeof filters.beds === 'object') {
          const { min, max } = filters.beds;
          if (min && max && min === max) parts.push(`${min} bed`);
          else if (min && max) parts.push(`${min}-${max} bed`);
          else if (min) parts.push(`${min}+ bed`);
        }
      }
      
      if (filters.homeTypes && filters.homeTypes.length === 1) {
        parts.push(filters.homeTypes[0]);
      }
    }
    
    if (settings.propertyType === PropertyType.LAND) {
      if (filters.landTypes && filters.landTypes.length === 1) {
        parts.push(filters.landTypes[0]);
      }
    }
    
    return parts.join(' ') || `My ${settings.propertyType} search`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="accent"
          className="h-10 px-4 border-border hover:bg-white hover:text-accent-strong relative"
        >
          <Bookmark className="h-4 w-4 mr-2" />
          Save Search
          {hasChanges && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-heart" />
              Save this search
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="searchName" className="text-sm font-medium">
                Search name
              </label>
              <Input
                id="searchName"
                placeholder={getSuggestedName()}
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onFocus={() => {
                  if (!searchName) {
                    setSearchName(getSuggestedName());
                  }
                }}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emailUpdates"
                checked={emailUpdates}
                onCheckedChange={(checked) => setEmailUpdates(checked === true)}
              />
              <label 
                htmlFor="emailUpdates" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Email me updates when new properties match
              </label>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Your search will be saved locally and can be accessed anytime.
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
            variant="accent"
              onClick={handleSave}
              className=" hover:bg-white hover:text-accent-strong"
            >
              Save Search
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}