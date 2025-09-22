"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@3rdparty/ui/select";
import { Button } from "@3rdparty/ui/button";
import { useGlobalSettings } from "@stores/useGlobalSettings";

interface TableFooterPaginationProps {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}

export default function TableFooterPagination({
  page,
  totalPages,
  setPage,
}: TableFooterPaginationProps) {
  const { settings, setRecordsPerPage } = useGlobalSettings();

  return (
    <div className="flex items-center justify-between p-4 border-t">
      {/* Rows per page selector */}
      <div className="flex items-center space-x-2">
        <span className="text-sm">Rows per page:</span>
        <Select
          value={settings.rowsPerPage.toString()}
          onValueChange={(v) => {
            setRecordsPerPage(Number(v));
            setPage(1); // reset back to page 1
          }}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 30, 50].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="ghost"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
