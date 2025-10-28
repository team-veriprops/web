import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@3rdparty/ui/button';
import { X } from 'lucide-react';
import { useGlobalSettings } from '@stores/useGlobalSettings';
import { Money } from '@components/website/property/models';
import { formatMoney } from '@lib/utils';
import { usePropertyQueryState } from '../../libs/usePropertyStore';

// interface FilterChipsProps {
//   filters: any;
//   onRemove: (key: string, value?: any) => void;
//   onClearAll: () => void;
// }

export function FilterChips() {
  const { settings } = useGlobalSettings();
    
    const [filters, updateFilters, resetFilters] = usePropertyQueryState();
  
  const chips = [];

  // Price chip
  if (filters.price_min || filters.price_max) {
    // const localFormatPrice = (price: number) => `₦${(price / 1000000).toFixed(0)}M`;
    const localFormatPrice = (price: number) => formatMoney(Money.from({value: price, currency: settings.currency}));
    let priceText = '';
    
    if (filters.price_min && filters.price_max) {
      priceText = `${localFormatPrice(filters.price_min)} - ${localFormatPrice(filters.price_max)}`;
    } else if (filters.price_min) {
      priceText = `${localFormatPrice(filters.price_min)}+`;
    } else {
      priceText = `Up to ${localFormatPrice(filters.price_max!)}`;
    }
    
    chips.push({
      key: 'price',
      label: priceText,
      onRemove: () => updateFilters({ price_min: undefined, price_max: undefined })
    });
  }

  // Beds chip
  if (filters.bedrooms && filters.bedrooms !== 'any') {
    let bedText = '';
    if (filters.bedrooms === 'studio') {
      bedText = 'Studio';
    } else if (typeof filters.bedrooms === 'object') {
      const { min, max } = filters.bedrooms;
      if (min === max && max === 1) bedText = `${min} bed`;
      else if (min === max) bedText = `${min} beds`;
      else if (max && max != 5) bedText = `${min}-${max} beds`;
      else bedText = `${min}+ beds`;
    }
    
    chips.push({
      key: 'bedrooms',
      label: bedText,
      onRemove: () => updateFilters({bedrooms: 'any'})
    });
  }

  // Baths chip
  if (filters.bathrooms && filters.bathrooms !== 0) {
    chips.push({
      key: 'bathrooms',
      label: `${filters.bathrooms}+ baths`,
      onRemove: () => updateFilters({bathrooms: undefined})
    });
  }

  // Home types chip
  if (filters.home_types && filters.home_types.length > 0) {
    const label = filters.home_types.length === 1 
      ? filters.home_types[0]
      : `${filters.home_types.length} home types`;
    
    chips.push({
      key: 'home_types',
      label,
      onRemove: () => updateFilters({home_types: []})
    });
  }

  // Land types chip
  if (filters.land_types && filters.land_types.length > 0) {
    const label = filters.land_types.length === 1 
      ? filters.land_types[0]
      : `${filters.land_types.length} land types`;
    
    chips.push({
      key: 'land_types',
      label,
      onRemove: () => updateFilters({land_types: []})
    });
  }

  // Title docs chip
  if (filters.title_docs && filters.title_docs.length > 0) {
    const label = filters.title_docs.length === 1 
      ? filters.title_docs[0]
      : `${filters.title_docs.length} title docs`;
    
    chips.push({
      key: 'title_docs',
      label,
      onRemove: () => updateFilters({title_docs: []})
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <AnimatePresence>
        {chips.map((chip) => (
          <motion.div
            key={chip.key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={chip.onRemove}
              className="h-8 px-3 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
            >
              <span className="text-sm font-medium">{chip.label}</span>
              <X className="h-3 w-3 ml-2" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {chips.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => resetFilters()}
          className="h-8 px-3 text-muted-foreground hover:text-foreground"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
