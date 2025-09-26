"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@3rdparty/ui/tabs";
import { usePurchasesStore } from "@stores/usePurchasesStore";
import PurchaseTable from "./PurchaseTable";
import { useEffect } from "react";
import { Card, CardContent } from "@components/3rdparty/ui/card";
import { motion } from "framer-motion";
import PageHeader from "@components/ui/PageHeader";
import { PageDetails } from "types/models";
import { TableToolbar } from "@components/ui/TableToolbar";
import { productsTableTabs } from "containers";

export default function PurchasesComponentPage({
  title,
  description,
}: PageDetails) {
  const { purchases, fetchPurchases } = usePurchasesStore();

  useEffect(() => {
    fetchPurchases(); // load mock data or API call
  }, [fetchPurchases]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <PageHeader title={title} description={description} active_tab={""} />

      <Tabs defaultValue={productsTableTabs[0].value} className="space-y-6">
        <TabsList>
          {productsTableTabs.map(({ value, label }) => (
          <TabsTrigger  key={value} value={value}>{label}</TabsTrigger>
          ))}
        </TabsList>

        {productsTableTabs.map(({ value, label }) => (
          <TabsContent key={value} value={value} className="space-y-6">
            <Card>
              <CardContent className="p-6">
                {/* Toolbar */}
                <TableToolbar searchPlaceholder={`Search ${value}...`}>
                  <div></div>
                </TableToolbar>

                <PurchaseTable items={purchases.filter((p) => p.type === value)}/>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
}
