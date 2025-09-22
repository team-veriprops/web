"use client";

import { useState } from "react";
import { Button } from "@3rdparty/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@3rdparty/ui/dialog";
import { Input } from "@3rdparty/ui/input";
import { Label } from "@3rdparty/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@3rdparty/ui/select";
import type { useTeam } from "@hooks/useTeam";
import { Mail, UserPlus } from "lucide-react";

interface InviteMemberDialogProps {
  team: ReturnType<typeof useTeam>;
}

export default function InviteMemberDialog({ team }: InviteMemberDialogProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(team.customRoles[0]?.name ?? "Viewer");
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInvite = () => {
    if (!firstName || !lastName || !email) return;
    team.setTeamMembers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: `${firstName} ${lastName}`,
        email,
        role,
        status: "Pending",
        joinDate: new Date().toISOString(),
      },
    ]);
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Team Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite New Team Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Label>First Name</Label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label>Last Name</Label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Assigned Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {team.customRoles.map((r) => (
                  <SelectItem key={r.id} value={r.name}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
          <DialogFooter>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInvite}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invitation
                  </Button>
                </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
