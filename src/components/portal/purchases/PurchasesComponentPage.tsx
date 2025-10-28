"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@3rdparty/ui/tabs";
import PurchaseTable from "./PurchaseTable";
import { motion } from "framer-motion";
import PageHeader from "@components/ui/PageHeader";
import { PageDetails, productsTableTabs } from "types/models";
import { usePurchaseStore } from "./libs/usePurchaseStore";
import { PropertyType } from "@components/website/property/models";
import { useGlobalSettings } from "@stores/useGlobalSettings";

export default function PurchasesComponentPage({
  title,
  description,
}: PageDetails) {
  const { filters, updateFilters } = usePurchaseStore();
  const {settings} = useGlobalSettings()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <PageHeader title={title} description={description} />

      <Tabs
        value={filters.type}
        onValueChange={(value) =>
          updateFilters({ type: value as PropertyType, page: settings.firstPage })
        }
        className="space-y-6"
      >
        <TabsList>
          {productsTableTabs.map(({ value, label }) => (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {productsTableTabs.map(({ value, label }) => (
          <TabsContent key={value} value={value} className="space-y-6">
            <PurchaseTable />
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
}
