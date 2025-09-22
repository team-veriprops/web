"use client";

import { useState } from "react";
import { useToast } from "@hooks/use-toast";

export type SystemRole = "Admin" | "Editor" | "Viewer";

export interface CustomRole {
  id: string;
  name: string;
  description: string;
  systemRoles: SystemRole[];
  isSystemRole: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending" | "Inactive";
  avatar?: string;
  joinDate: string;
}

export function useTeam() {
  const { toast } = useToast();

  const systemRoles: SystemRole[] = ["Admin", "Editor", "Viewer"];

  const [customRoles, setCustomRoles] = useState<CustomRole[]>([
    { id: "1", name: "Admin", description: "Full system access", systemRoles: ["Admin"], isSystemRole: true },
    { id: "2", name: "Editor", description: "Can edit content", systemRoles: ["Editor"], isSystemRole: true },
    { id: "3", name: "Viewer", description: "View only access", systemRoles: ["Viewer"], isSystemRole: true },
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: "1", name: "John Smith", email: "john.smith@company.com", role: "Admin", status: "Active", joinDate: "2024-01-15" },
    { id: "2", name: "Sarah Johnson", email: "sarah.j@company.com", role: "Editor", status: "Active", joinDate: "2024-02-20" },
    { id: "3", name: "Mike Wilson", email: "mike.w@company.com", role: "Viewer", status: "Inactive", joinDate: "2024-03-10" },
  ]);

  // Example role update
  const updateMemberRole = (memberId: string, newRole: string) => {
    setTeamMembers(prev =>
      prev.map(m => (m.id === memberId ? { ...m, role: newRole } : m))
    );
    toast({ title: "Role updated", description: "Member role updated successfully" });
  };

  // Example role deletion
  const deleteRole = (roleId: string) => {
    const role = customRoles.find(r => r.id === roleId);
    if (!role) return;

    if (role.isSystemRole) {
      toast({ title: "Cannot delete", description: "System roles cannot be deleted", variant: "destructive" });
      return;
    }

    const isAssigned = teamMembers.some(m => m.role === role.name);
    if (isAssigned) {
      toast({ title: "Cannot delete", description: "Role is assigned to team members", variant: "destructive" });
      return;
    }

    setCustomRoles(prev => prev.filter(r => r.id !== roleId));
    toast({ title: "Role deleted", description: `${role.name} was deleted` });
  };

  return {
    systemRoles,
    customRoles,
    setCustomRoles,
    teamMembers,
    setTeamMembers,
    updateMemberRole,
    deleteRole,
  };
}
