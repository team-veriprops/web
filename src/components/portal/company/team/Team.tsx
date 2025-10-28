"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@3rdparty/ui/tabs";
import MembersTable from "./MembersTable";
import RolesTable from "./role/RoleTable";
import { motion } from "framer-motion";
import { PageDetails } from "types/models";
import PageHeader from "@components/ui/PageHeader";
import { useRoleStore } from "./role/libs/useRoleStore";
import { useUserStore } from "./libs/useUserStore";
import { useGlobalSettings } from "@stores/useGlobalSettings";

export default function Team({ title, description }: PageDetails) {
  const { settings } = useGlobalSettings();
  const { updateFilters: updateRoleFilters } = useRoleStore();
  const { activeTab, setActiveTab, updateFilters: updateUserFilters } = useUserStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <PageHeader title={title} description={description} />

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          updateRoleFilters({ page: settings.firstPage });
          updateUserFilters({ page: settings.firstPage });
          setActiveTab(value)
        }}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <MembersTable />
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <RolesTable />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
