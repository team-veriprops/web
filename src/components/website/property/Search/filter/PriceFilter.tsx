import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@3rdparty/ui/button";
import { Input } from "@3rdparty/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@3rdparty/ui/popover";
import { Slider } from "@3rdparty/ui/slider";
import { ChevronDown } from "lucide-react";
import { formatMoney } from "@lib/utils";
import {
  Money,
  TransactionCurrency,
} from "@components/website/property/models";
import { usePropertyQueryState } from "../../libs/usePropertyStore";
import { useGlobalSettings } from "@stores/useGlobalSettings";

const localFormatPrice = (price: number, currency: TransactionCurrency) => {
  return formatMoney(Money.from({ value: price, currency: currency }));
};

// Price distribution for histogram (mock data)
const priceDistribution = [
  { range: "0-20M", count: 15 },
  { range: "20-40M", count: 25 },
  { range: "40-60M", count: 35 },
  { range: "60-80M", count: 28 },
  { range: "80-100M", count: 20 },
  { range: "100M+", count: 12 },
];

export function PriceFilter() {
  const [filters, updateFilters] = usePropertyQueryState();

  const { settings } = useGlobalSettings();
  const [localMin, setLocalMin] = useState(filters.price_min?.toString() || "");
  const [localMax, setLocalMax] = useState(filters.price_max?.toString() || "");
  const [sliderValues, setSliderValues] = useState([
    filters.price_min || 0,
    filters.price_max || 200000000,
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState<string>();

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values);
    setLocalMin(values[0] > 0 ? values[0].toString() : "");
    setLocalMax(values[1] < 200000000 ? values[1].toString() : "");
  };

  const handleDone = () => {
    const minVal = localMin ? parseInt(localMin) : undefined;
    const maxVal = localMax ? parseInt(localMax) : undefined;

    // Auto-swap if min > max
    if (minVal && maxVal && minVal > maxVal) {
      updateFilters({ price_min: maxVal, price_max: minVal });
    } else {
      updateFilters({ price_min: minVal, price_max: maxVal });
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    setLocalMin("");
    setLocalMax("");
    setSliderValues([0, 200000000]);

    updateFilters({ price_min: undefined, price_max: undefined });
  };

  const getDisplayText = () => {
    if (filters.price_min && filters.price_max)
      return `${localFormatPrice(filters.price_min, settings.currency)} - ${localFormatPrice(filters.price_max, settings.currency)}`;
    if (filters.price_min)
      return `${localFormatPrice(filters.price_min, settings.currency)}+`;
    if (filters.price_max)
      return `Up to ${localFormatPrice(filters.price_max, settings.currency)}`;

    handleReset();
    return "Price";
  };

  useEffect(() => {
    setDisplayText(getDisplayText());
  }, [filters.price_min, filters.price_max]);

  const maxBarHeight = Math.max(...priceDistribution.map((d) => d.count));

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
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-full bg-primary/20 rounded-t"
                      style={{
                        height: `${(bar.count / maxBarHeight) * 60}px`,
                        minHeight: "4px",
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
                  <label className="text-sm text-muted-foreground">
                    Min Price
                  </label>
                  <Input
                    type="text"
                    placeholder="₦0"
                    value={
                      localMin
                        ? localFormatPrice(
                            parseInt(localMin),
                            settings.currency
                          )
                        : ""
                    }
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, "");
                      setLocalMin(value);
                      if (value) {
                        setSliderValues([parseInt(value), sliderValues[1]]);
                      }
                    }}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Max Price
                  </label>
                  <Input
                    type="text"
                    placeholder="No max"
                    value={
                      localMax
                        ? localFormatPrice(
                            parseInt(localMax),
                            settings.currency
                          )
                        : ""
                    }
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, "");
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
