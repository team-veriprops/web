"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@3rdparty/ui/tabs";
import { Card, CardContent } from "@3rdparty/ui/card";
import { useMyForSaleStore } from "@stores/useMyForSaleStore";
import { ListingsTable } from "./ListingsTable";
import { StatsSection } from "./StatsSection";
import { Toolbar } from "./Toolbar";
import { useToast } from "@hooks/use-toast";
import { motion } from "framer-motion";

export function MyForSaleComponent() {
  const { toast } = useToast();
  const { activeTab, setActiveTab } = useMyForSaleStore();

  const handleAddNew = (category: 'lands' | 'houses' | 'services') => {
    toast({
      title: 'Add New Listing',
      description: `Add new ${category.slice(0, -1)} form would open here.`,
    });
  };

  const tabsData = [
    { value: 'lands', label: 'Lands' },
    { value: 'houses', label: 'Houses' },
    { value: 'services', label: 'Services' },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">My For Sale</h1>
          <p className="text-muted-foreground">
            Manage all your properties and services currently listed for sale. 
          Track their status, update details, and monitor interest from buyers.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      {/* <StatsSection /> */}

      {/* Tabs Section */}
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as 'lands' | 'houses' | 'services')}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-3 w-fit">
          {tabsData.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsData.map(({ value, label }) => (
          <TabsContent key={value} value={value} className="space-y-6">
            <Card>
              <CardContent className="p-6">
                {/* Toolbar */}
                <Toolbar
                  category={value}
                  onAddNew={() => handleAddNew(value)}
                />

                {/* Listings Table */}
                <ListingsTable />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
};
