import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@3rdparty/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@3rdparty/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@3rdparty/ui/accordion';
import { Checkbox } from '@3rdparty/ui/checkbox';
import { Slider } from '@3rdparty/ui/slider';
import { Filter, X } from 'lucide-react';

interface FiltersSheetProps {
  category: 'houses' | 'lands';
  filters: any;
  onChange: (filters: any) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const titleDocOptions = [
  { id: 'cOfO', label: 'C of O (Certificate of Occupancy)' },
  { id: 'governorsConsent', label: "Governor's Consent" },
  { id: 'deedOfAssignment', label: 'Deed of Assignment' },
  { id: 'registeredSurvey', label: 'Registered Survey' },
  { id: 'excision', label: 'Excision' },
  { id: 'gazette', label: 'Gazette' },
];

const developmentStageOptions = [
  { id: 'bareLand', label: 'Bare land' },
  { id: 'fenced', label: 'Fenced' },
  { id: 'gatedEstate', label: 'Gated estate' },
  { id: 'underConstruction', label: 'Under construction' },
  { id: 'completed', label: 'Completed' },
];

const proximityOptions = [
  { id: 'schools', label: 'Schools' },
  { id: 'hospitals', label: 'Hospitals' },
  { id: 'markets', label: 'Markets' },
  { id: 'transit', label: 'Public Transit' },
];

const zoningOptions = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'mixed', label: 'Mixed' },
  { id: 'agricultural', label: 'Agricultural' },
  { id: 'industrial', label: 'Industrial' },
];

export function FiltersSheet({ category, filters, onChange, isOpen, onOpenChange }: FiltersSheetProps) {
  const handleCheckboxChange = (section: string, value: string, checked: boolean) => {
    const currentValues = filters[section] || [];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues.filter((v: string) => v !== value);
    
    onChange({ ...filters, [section]: newValues });
  };

  const handleUtilityChange = (utility: string, value: boolean | string) => {
    onChange({
      ...filters,
      utilities: {
        ...filters.utilities,
        [utility]: value
      }
    });
  };

  const handleProximityDistanceChange = (distance: number[]) => {
    onChange({
      ...filters,
      proximity: {
        ...filters.proximity,
        distanceKm: distance[0]
      }
    });
  };

  const handleReset = () => {
    onChange({
      ...filters,
      title_docs: [],
      stage: [],
      utilities: {},
      proximity: { categories: [], distanceKm: 10 },
      zoning: []
    });
  };

  const handleApply = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="h-10 px-4 border-border hover:bg-muted/50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <SheetHeader className="pb-6">
            <SheetTitle className="text-xl font-semibold">Filters</SheetTitle>
          </SheetHeader>

          <div className="space-y-6">
            <Accordion type="multiple" defaultValue={['ownership', 'development']} className="w-full">
              
              {/* Ownership / Title */}
              <AccordionItem value="ownership">
                <AccordionTrigger className="text-lg font-medium">
                  Ownership / Title
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {titleDocOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={option.id}
                          checked={filters.title_docs?.includes(option.id) || false}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('title_docs', option.id, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={option.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Development Stage */}
              <AccordionItem value="development">
                <AccordionTrigger className="text-lg font-medium">
                  Development Stage
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {developmentStageOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={option.id}
                          checked={filters.stage?.includes(option.id) || false}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('stage', option.id, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={option.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Utilities / Access */}
              <AccordionItem value="utilities">
                <AccordionTrigger className="text-lg font-medium">
                  Utilities / Access
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Electricity access</label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={filters.utilities?.electricity === true ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleUtilityChange('electricity', true)}
                        >
                          Yes
                        </Button>
                        <Button
                          variant={filters.utilities?.electricity === false ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleUtilityChange('electricity', false)}
                        >
                          No
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Water access</label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={filters.utilities?.water === true ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleUtilityChange('water', true)}
                        >
                          Yes
                        </Button>
                        <Button
                          variant={filters.utilities?.water === false ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleUtilityChange('water', false)}
                        >
                          No
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Road access</label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={filters.utilities?.road === 'paved' ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleUtilityChange('road', 'paved')}
                        >
                          Paved
                        </Button>
                        <Button
                          variant={filters.utilities?.road === 'unpaved' ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleUtilityChange('road', 'unpaved')}
                        >
                          Unpaved
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Drainage</label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={filters.utilities?.drainage === true ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleUtilityChange('drainage', true)}
                        >
                          Yes
                        </Button>
                        <Button
                          variant={filters.utilities?.drainage === false ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleUtilityChange('drainage', false)}
                        >
                          No
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Proximity */}
              <AccordionItem value="proximity">
                <AccordionTrigger className="text-lg font-medium">
                  Proximity
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {proximityOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={option.id}
                            checked={filters.proximity?.categories?.includes(option.id) || false}
                            onCheckedChange={(checked) => {
                              const currentCategories = filters.proximity?.categories || [];
                              const newCategories = checked 
                                ? [...currentCategories, option.id]
                                : currentCategories.filter((c: string) => c !== option.id);
                              
                              onChange({
                                ...filters,
                                proximity: {
                                  ...filters.proximity,
                                  categories: newCategories
                                }
                              });
                            }}
                          />
                          <label 
                            htmlFor={option.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Distance</label>
                        <span className="text-sm text-muted-foreground">
                          {filters.proximity?.distanceKm || 10}km
                        </span>
                      </div>
                      <Slider
                        value={[filters.proximity?.distanceKm || 10]}
                        onValueChange={handleProximityDistanceChange}
                        max={20}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Zoning / Land Use */}
              <AccordionItem value="zoning">
                <AccordionTrigger className="text-lg font-medium">
                  Zoning / Land Use
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {zoningOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={option.id}
                          checked={filters.zoning?.includes(option.id) || false}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('zoning', option.id, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={option.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 left-0 right-0 bg-background border-t border-border p-4 mt-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-muted-foreground hover:text-foreground"
            >
              Reset
            </Button>
            <Button 
              onClick={handleApply}
              className="bg-primary hover:bg-primary-hover px-8"
            >
              Apply Filters
            </Button>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}