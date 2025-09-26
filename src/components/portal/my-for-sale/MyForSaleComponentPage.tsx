"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@3rdparty/ui/tabs";
import { Card, CardContent } from "@3rdparty/ui/card";
import { useMyForSaleStore } from "@stores/useMyForSaleStore";
import { MyForSaleTable } from "./MyForSaleTable";
import { useToast } from "@hooks/use-toast";
import { motion } from "framer-motion";
import { TableToolbar } from "@components/ui/TableToolbar";
import { Button } from "@components/3rdparty/ui/button";
import { Grid2x2Plus, HandPlatter, HousePlus } from "lucide-react";
import { PageDetails } from "types/models";
import PageHeader from "@components/ui/PageHeader";
import { productsTableTabs } from "containers";
import { PropertyType } from "@components/website/property/models";

export function MyForSaleComponentPage({
  title,
  description,
}: PageDetails) {
  const { toast } = useToast();
  const { activeTab, setActiveTab } = useMyForSaleStore();

  const handleAddNew = (category: PropertyType) => {
    toast({
      title: "Add New Listing",
      description: `Add new ${category.slice(0, -1)} form would open here.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <PageHeader title={title} description={description} active_tab={""} />

      {/* Stats Section */}
      {/* <StatsSection /> */}

      {/* Tabs Section */}
      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as PropertyType)
        }
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-3 w-fit">
          {productsTableTabs.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="data-[state=active]:bg-primary"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {productsTableTabs.map(({ value, label }) => (
          <TabsContent key={value} value={value} className="space-y-6">
            <Card>
              <CardContent className="p-6">
                {/* Toolbar */}
                <TableToolbar searchPlaceholder={`Search ${value}...`}>
                  <Button
                    onClick={() => handleAddNew(value)}
                    className="flex items-center gap-2 capitalize"
                  >
                    {value === "land" && <Grid2x2Plus className="h-4 w-4" />}
                    {value === "house" && <HousePlus className="h-4 w-4" />}
                    {value === "service" && (
                      <HandPlatter className="h-4 w-4" />
                    )}
                    Add New {value}
                  </Button>
                </TableToolbar>

                {/* Listings Table */}
                <MyForSaleTable />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
}
