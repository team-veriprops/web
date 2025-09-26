"use client";

import { useState, useMemo } from "react";
import { Purchase } from "@stores/usePurchasesStore";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@3rdparty/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@3rdparty/ui/dropdown-menu";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  FileDown,
  MessageCircle,
} from "lucide-react";
import { Button } from "@3rdparty/ui/button";
import { Badge } from "@3rdparty/ui/badge";
import { format } from "date-fns";
import { AnimatedTableRow } from "@components/ui/AnimatedTableRow";
import { useGlobalSettings } from "@stores/useGlobalSettings";
import TableFooterPagination from "@components/ui/TableFooterPagination";
import { useSearchParams } from "next/navigation";
import { getSearchQuery } from "@lib/utils";

type SortKey = "title" | "price" | "date" | "status";
type SortOrder = "asc" | "desc";

export default function PurchaseTable({ items }: { items: Purchase[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const searchParams = useSearchParams();
  const { settings } = useGlobalSettings();
  const [page, setPage] = useState(1);

  const start = (page - 1) * settings.rowsPerPage;
  const end = start + settings.rowsPerPage;
  const paginated = items.slice(start, end);

  const totalPages = Math.ceil(items.length / settings.rowsPerPage);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filtered = useMemo(() => {
    const query = getSearchQuery(settings.searchQueryKey!, searchParams)

    let list = paginated.filter((p) =>
      query ? p.title.toLowerCase().includes(query) : true
    );

    list.sort((a, b) => {
      let aVal: string | number = a[sortKey];
      let bVal: string | number = b[sortKey];

      if (sortKey === "date") {
        aVal = new Date(a.date).getTime();
        bVal = new Date(b.date).getTime();
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [paginated, searchParams, sortKey, sortOrder]);

  const renderStatus = (status: Purchase["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No purchases yet.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => toggleSort("title")}
            >
              <div className="flex items-center gap-1">
                Title <ArrowUpDown size={14} />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => toggleSort("price")}
            >
              <div className="flex items-center gap-1">
                Price <ArrowUpDown size={14} />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => toggleSort("date")}
            >
              <div className="flex items-center gap-1">
                Date <ArrowUpDown size={14} />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => toggleSort("status")}
            >
              <div className="flex items-center gap-1">
                Status <ArrowUpDown size={14} />
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((purchase, index) => (
            <AnimatedTableRow
              key={purchase.id}
              id={purchase.id}
              index={index}
              elementOfInterest={"deletingId"}
            >
              <TableCell className="font-medium">{purchase.title}</TableCell>
              <TableCell>₦{purchase.price.toLocaleString()}</TableCell>
              <TableCell>{format(new Date(purchase.date), "PPP")}</TableCell>
              <TableCell>{renderStatus(purchase.status)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => console.log("Details", purchase.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Receipt", purchase.id)}
                    >
                      <FileDown className="mr-2 h-4 w-4" /> Download Receipt
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Support", purchase.id)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" /> Contact Support
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </AnimatedTableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination footer */}
      <TableFooterPagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
