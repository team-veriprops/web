"use client";

import { useEffect, useState } from "react";
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
import { Mail, UserPlus } from "lucide-react";
import { useUserQueries } from "./libs/useUserQueries";
import { CreateCompanyUserDto } from "./models";
import { useRoleStore } from "./role/libs/useRoleStore";
import { useRoleQueries } from "./role/libs/useRoleQueries";
import { AsyncStateComponent } from "@components/ui/AsyncStateComponent";
import { useCompanyStore } from "../libs/useCompanyStore";
import { UserStatus } from "@components/user/models";

export default function InviteMemberDialog() {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [role, setRole] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const role_page_size = 100;

  const { updateFilters } = useRoleStore();
  const {currentCompany} = useCompanyStore()

  const { useSearchRolePage } = useRoleQueries();
  const { data: dataPage, isLoading, isError } = useSearchRolePage(currentCompany?.id!);

  useEffect(() => {
    updateFilters({ page_size: role_page_size });
  }, [role_page_size, updateFilters]);

  const { useCreateUser } = useUserQueries();
  const createUser = useCreateUser(currentCompany?.id!);

  const newUser: CreateCompanyUserDto = {
    first_name: firstName!,
    last_name: lastName!,
    email: email!,
    role: role!,
    status: UserStatus.PENDING,
  };

  const handleInvite = () => {
    createUser.mutate(newUser, {
      onSuccess: () => {
        setFirstName("");
        setLastName("");
        setEmail("");

        // toast({
        //   title: "User Sent",
        //   description: "Your user has been delivered.",
        // });
      },
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>
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
            <AsyncStateComponent
              isLoading={isLoading}
              isError={isError}
              data={dataPage}
              loadingText="Loading roles..."
              errorText="Failed to load roles, please try again later."
              emptyText="No roles found."
            >
              {() => (
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select role"} />
                  </SelectTrigger>
                  <SelectContent>
                    {dataPage?.items.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </AsyncStateComponent>
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
