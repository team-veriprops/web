"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@3rdparty/ui/tabs";
import MembersTable from "./MembersTable";
import RolesTable from "./RolesTable";
import InviteMemberDialog from "./InviteMemberDialog";
import CreateRoleDialog from "./CreateRoleDialog";
import { useTeam } from "@hooks/useTeam";
import { motion } from "framer-motion";
import { title } from "process";
import { PageDetails } from "types/models";
import PageHeader from "@components/ui/PageHeader";

export default function Team({
  title,
  description,
}: PageDetails) {
  const team = useTeam();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <PageHeader title={title} description={description} />

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <MembersTable team={team} />
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <RolesTable team={team} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
