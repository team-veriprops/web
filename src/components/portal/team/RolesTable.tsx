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
import { Button } from "@3rdparty/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import type { useTeam } from "@hooks/useTeam";
import { Badge } from "@components/3rdparty/ui/badge";
import { useGlobalSettings } from "@stores/useGlobalSettings";
import TableFooterPagination from "@components/ui/TableFooterPagination";
import { motion } from "framer-motion";
import { AnimatedTableRow } from "@components/ui/AnimatedTableRow";
import { TableToolbar } from "@components/ui/TableToolbar";
import CreateRoleDialog from "./CreateRoleDialog";

interface RolesTableProps {
  team: ReturnType<typeof useTeam>;
}

export default function RolesTable({ team }: RolesTableProps) {
  const { settings } = useGlobalSettings();
  const [page, setPage] = useState(1);

  const start = (page - 1) * settings.rowsPerPage;
  const end = start + settings.rowsPerPage;
  const paginated = team.customRoles.slice(start, end);

  const totalPages = Math.ceil(team.customRoles.length / settings.rowsPerPage);

  return (
    <Card>
      <CardContent className="p-6">
        {/* Toolbar */}
        <TableToolbar searchPlaceholder={`Search roles...`}>
          <CreateRoleDialog team={team} />
        </TableToolbar>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>System Roles</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((role, index) => (
              <AnimatedTableRow
                key={role.id}
                id={role.id}
                index={index}
                elementOfInterest={"deletingId"}
              >
                <TableCell>
                  <div className="font-medium">{role.name}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {role.description}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {role.systemRoles.map((systemRole) => (
                      <Badge
                        key={systemRole}
                        variant="outline"
                        className="text-xs"
                      >
                        {systemRole}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={role.isSystemRole ? "default" : "secondary"}>
                    {role.isSystemRole ? "System" : "Custom"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {!role.isSystemRole && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => team.deleteRole(role.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
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
        </div> */}
      {/* </div> */}
    </Card>
  );
}
