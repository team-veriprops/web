import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@3rdparty/ui/button';
import { Input } from '@3rdparty/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@3rdparty/ui/popover';
import { Slider } from '@3rdparty/ui/slider';
import { ChevronDown } from 'lucide-react';
import { priceDistribution } from '@data/seed';
import { formatPrice } from '@lib/utils';
import { Money, TransactionCurrency } from '@components/property/models';
// import { priceDistribution } from '@lib/mockData';

interface PriceFilterProps {
  min?: number;
  max?: number;
  currency: TransactionCurrency;
  onChange: (min?: number, max?: number) => void;
}

const localFormatPrice = (price: number, currency: TransactionCurrency) => {
  return formatPrice(Money.from({value: price, currency: currency}))
};

const presetPrices = [5000000, 10000000, 25000000, 50000000, 100000000];

export function PriceFilter({ min, max, currency, onChange }: PriceFilterProps) {
  const [localMin, setLocalMin] = useState(min?.toString() || '');
  const [localMax, setLocalMax] = useState(max?.toString() || '');
  const [sliderValues, setSliderValues] = useState([min || 0, max || 200000000]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values);
    setLocalMin(values[0] > 0 ? values[0].toString() : '');
    setLocalMax(values[1] < 200000000 ? values[1].toString() : '');
  };

  const handleDone = () => {
    const minVal = localMin ? parseInt(localMin) : undefined;
    const maxVal = localMax ? parseInt(localMax) : undefined;
    
    // Auto-swap if min > max
    if (minVal && maxVal && minVal > maxVal) {
      onChange(maxVal, minVal);
    } else {
      onChange(minVal, maxVal);
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    setLocalMin('');
    setLocalMax('');
    setSliderValues([0, 200000000]);
    onChange(undefined, undefined);
  };

  const handlePresetClick = (price: number, isShiftClick: boolean = false) => {
    if (isShiftClick) {
      setLocalMin(price.toString());
      setSliderValues([price, sliderValues[1]]);
    } else {
      setLocalMax(price.toString());
      setSliderValues([sliderValues[0], price]);
    }
  };

  const getDisplayText = () => {
    if (min && max) return `${localFormatPrice(min, currency)} - ${localFormatPrice(max, currency)}`;
    if (min) return `${localFormatPrice(min, currency)}+`;
    if (max) return `Up to ${localFormatPrice(max, currency)}`;
    return 'Price';
  };

  const maxBarHeight = Math.max(...priceDistribution.map(d => d.count));

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
          <div className="space-y-9">
            {/* Histogram */}
            <div className="space-y-3">
              {/* <h4 className="font-medium text-foreground">Price Distribution</h4> */}
              <div className="flex items-end justify-between h-30 gap-1">
                {priceDistribution.map((bar, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-primary/20 rounded-t"
                      style={{
                        height: `${(bar.count / maxBarHeight) * 60}px`,
                        minHeight: '4px'
                      }}
                    />
                    <span className="text-xs text-muted-foreground mt-1">
                      {bar.range}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Range Slider */}
            <div className="space-y-4">
              <Slider
                value={sliderValues}
                onValueChange={handleSliderChange}
                max={200000000}
                min={0}
                step={1000000}
                className="w-full"
              />
              
              {/* Manual Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-muted-foreground">Min Price</label>
                  <Input
                    type="text"
                    placeholder="₦0"
                    value={localMin ? localFormatPrice(parseInt(localMin), currency) : ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      setLocalMin(value);
                      if (value) {
                        setSliderValues([parseInt(value), sliderValues[1]]);
                      }
                    }}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Max Price</label>
                  <Input
                    type="text"
                    placeholder="No max"
                    value={localMax ? localFormatPrice(parseInt(localMax), currency) : ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      setLocalMax(value);
                      if (value) {
                        setSliderValues([sliderValues[0], parseInt(value)]);
                      }
                    }}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Preset Chips */}
            {/* <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Quick sets:</span>
              <div className="flex flex-wrap gap-2">
                {presetPrices.map((price) => (
                  <Button
                    key={price}
                    variant="outline"
                    size="sm"
                    onClick={(e) => handlePresetClick(price, e.shiftKey)}
                    className="text-xs h-8 px-3 hover:bg-primary hover:text-primary-foreground"
                  >
                    {localFormatPrice(price, currency)}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Click to set max • Shift+click to set min
              </p>
            </div> */}

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