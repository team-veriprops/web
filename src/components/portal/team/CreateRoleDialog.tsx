"use client";

import { useState } from "react";
import { Button } from "@3rdparty/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@3rdparty/ui/dialog";
import { Input } from "@3rdparty/ui/input";
import { Label } from "@3rdparty/ui/label";
import { MultiSelect } from "@3rdparty/ui/multi-select";
import type { SystemRole, useTeam } from "@hooks/useTeam";
import { Plus, Settings } from "lucide-react";

interface CreateRoleDialogProps {
  team: ReturnType<typeof useTeam>;
}

export default function CreateRoleDialog({ team }: CreateRoleDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemRoles, setSystemRoles] = useState<SystemRole[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreate = () => {
    if (!name) return;
    team.setCustomRoles((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name,
        description,
        systemRoles,
        isSystemRole: false,
      },
    ]);
    setName("");
    setDescription("");
    setSystemRoles([]);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
          <DialogDescription>
                    Create a custom role and assign system permissions to it.
                  </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Role Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Manager"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Role description"
            />
          </div>
          <div className="space-y-2">
            <Label>System Role Permissions</Label>
            <MultiSelect
              options={team.systemRoles}
              value={systemRoles}
              onChange={setSystemRoles}
              placeholder="Select permissions"
            />
          </div>
        </div>
        <DialogFooter>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreate}>
                    <Settings className="h-4 w-4 mr-2" />
                    Create Role
                  </Button>
                </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
