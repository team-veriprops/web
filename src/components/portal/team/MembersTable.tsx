"use client";

import { Card, CardContent } from "@3rdparty/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@3rdparty/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@3rdparty/ui/select";
import { Badge } from "@3rdparty/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@3rdparty/ui/avatar";
import { useState } from "react";
import type { useTeam } from "@hooks/useTeam";
import { Button } from "@3rdparty/ui/button";
import { Shield } from "lucide-react";
import TableFooterPagination from "@components/ui/TableFooterPagination";
import { useGlobalSettings } from "@stores/useGlobalSettings";
import { motion } from "framer-motion";
import { AnimatedTableRow } from "@components/ui/AnimatedTableRow";
import InviteMemberDialog from "./InviteMemberDialog";
import { TableToolbar } from "@components/ui/TableToolbar";

interface MembersTableProps {
  team: ReturnType<typeof useTeam>;
}

export default function MembersTable({ team }: MembersTableProps) {
  const { settings } = useGlobalSettings();
  const [page, setPage] = useState(1);

  const start = (page - 1) * settings.rowsPerPage;
  const end = start + settings.rowsPerPage;
  const paginated = team.teamMembers.slice(start, end);

  const totalPages = Math.ceil(team.teamMembers.length / settings.rowsPerPage);

  return (
    <Card>
      <CardContent className="p-6">
        {/* Toolbar */}
        <TableToolbar searchPlaceholder={`Search users...`}>
          <InviteMemberDialog team={team} />
        </TableToolbar>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((member, index) => (
              <AnimatedTableRow
                key={member.id}
                id={member.id}
                index={index}
                elementOfInterest={"deletingId"}
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={member.role}
                    onValueChange={(value) =>
                      team.updateMemberRole(member.id, value)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {team.customRoles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          <div className="flex items-center">
                            {role.name === "Admin" && (
                              <Shield className="h-3 w-3 mr-2" />
                            )}
                            {role.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      member.status === "Active"
                        ? "default"
                        : member.status === "Pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(member.joinDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={member.status === "Pending"}
                  >
                    Remove
                  </Button>
                </TableCell>
              </AnimatedTableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Pagination footer */}
      <TableFooterPagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
      {/* <div className="flex items-center justify-between p-4 border-t">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Rows per page:</span>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(v) => {
              setRecordsPerPage(Number(v));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div> */}
    </Card>
  );
}
