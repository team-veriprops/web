"use client";

import { useState } from "react";
import { Button } from "@3rdparty/ui/button";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit,
  Eye,
  EyeOff,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@3rdparty/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useMyForSaleStore } from "@stores/useMyForSaleStore";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@components/3rdparty/ui/table";
import { useToast } from "@hooks/use-toast";
import { Badge } from "@3rdparty/ui/badge";
import TableFooterPagination from "@components/ui/TableFooterPagination";
import { useGlobalSettings } from "@stores/useGlobalSettings";

export function ListingsTable() {
  const { settings } = useGlobalSettings();

  const { toast } = useToast();
  const {
    getFilteredListings,
    currentPage,
    sortBy,
    sortOrder,
    setCurrentPage,
    setSorting,
    updateListing,
    deleteListing,
  } = useMyForSaleStore();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const listings = getFilteredListings();
  const totalPages = Math.ceil(listings.length / settings.rowsPerPage);
  const startIndex = (currentPage - 1) * settings.rowsPerPage;
  const endIndex = startIndex + settings.rowsPerPage;
  const paginatedListings = listings.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSorting(column, sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSorting(column, "asc");
    }
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Pending":
        return "secondary";
      case "Sold":
        return "outline";
      case "Hidden":
        return "destructive";
      default:
        return "default";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Edit Listing",
      description: "Edit functionality would open a form modal here.",
    });
  };

  const handlePreview = (id: string) => {
    toast({
      title: "Preview Listing",
      description: "Preview functionality would show listing details here.",
    });
  };

  const handleToggleVisibility = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Hidden" ? "Active" : "Hidden";
    updateListing(id, { status: newStatus as any });
    toast({
      title: "Listing Updated",
      description: `Listing ${newStatus === "Hidden" ? "hidden" : "made visible"} successfully.`,
    });
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      deleteListing(id);
      setDeletingId(null);
      toast({
        title: "Listing Deleted",
        description: "Listing has been permanently deleted.",
      });
    }, 1000);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      {/* <div className="rounded-lg border"> */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("title")}
              >
                <div className="flex items-center gap-2">
                  Title
                  {getSortIcon("title")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("location")}
              >
                <div className="flex items-center gap-2">
                  Location
                  {getSortIcon("location")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center gap-2">
                  Price
                  {getSortIcon("price")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-2">
                  Status
                  {getSortIcon("status")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("views")}
              >
                <div className="flex items-center gap-2">
                  Views
                  {getSortIcon("views")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("inquiries")}
              >
                <div className="flex items-center gap-2">
                  Inquiries
                  {getSortIcon("inquiries")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("lastUpdated")}
              >
                <div className="flex items-center gap-2">
                  Last Updated
                  {getSortIcon("lastUpdated")}
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedListings.map((listing, index) => (
              <motion.tr
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: deletingId === listing.id ? 0.5 : 1,
                  y: 0,
                  scale: deletingId === listing.id ? 0.95 : 1,
                }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="max-w-[200px]">
                    <p className="truncate">{listing.title}</p>
                  </div>
                </TableCell>
                <TableCell>{listing.location}</TableCell>
                <TableCell className="font-semibold">
                  {formatPrice(listing.price)}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(listing.status)}>
                    {listing.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-muted-foreground" />
                    {listing.views.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-muted-foreground" />
                    {listing.inquiries.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(listing.lastUpdated)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(listing.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handlePreview(listing.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleToggleVisibility(listing.id, listing.status)
                        }
                      >
                        {listing.status === "Hidden" ? (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Show
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Hide
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(listing.id)}
                        className="text-destructive"
                        disabled={deletingId === listing.id}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      {/* </div> */}

      {/* Footer with Pagination */}
      <TableFooterPagination
        page={currentPage}
        totalPages={totalPages}
        setPage={setCurrentPage}
      />
    </div>
  );
}
