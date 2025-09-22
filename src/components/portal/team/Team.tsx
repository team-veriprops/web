"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@3rdparty/ui/tabs";
import MembersTable from "./MembersTable";
import RolesTable from "./RolesTable";
import InviteMemberDialog from "./InviteMemberDialog";
import CreateRoleDialog from "./CreateRoleDialog";
import { useTeam } from "@hooks/useTeam";

export default function Team() {
  const team = useTeam();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Team & Access</h1>
          <p className="text-muted-foreground">
            Manage your team members, roles, and access levels
          </p>
        </div>
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Team Members</h2>
              <p className="text-muted-foreground">
                {team.teamMembers.length} member
                {team.teamMembers.length !== 1 ? "s" : ""} in your team
              </p>
            </div>
            <InviteMemberDialog team={team} />
          </div>
          <MembersTable team={team} />
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Role Management</h2>
              <p className="text-muted-foreground">
                Create and manage custom roles for your team
              </p>
            </div>
            <CreateRoleDialog team={team} />
          </div>
          <RolesTable team={team} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
