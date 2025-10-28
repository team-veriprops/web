"use client";

import { Eye, FileDown, MessageCircle } from "lucide-react";
import { Badge } from "@3rdparty/ui/badge";
import { format } from "date-fns";
import { formatMoney } from "@lib/utils";
import { usePurchaseQueries } from "./libs/usePurchaseQueries";
import { usePurchaseStore } from "./libs/usePurchaseStore";
import { PurchaseStatus, QueryPurchaseDto } from "./models";
import { useGlobalSettings } from "@stores/useGlobalSettings";
import { useEffect } from "react";
import PurchaseDetailComponent from "./details/PurchaseDetailComponent";
import { Action, Column, DataTable } from "@components/ui/DataTable";

export default function PurchaseTable() {
  const { settings } = useGlobalSettings();
  const { filters, updateFilters, setCurrentPurchase, setViewPurchaseDetail } =
    usePurchaseStore();

  const { useSearchPurchasePage } = usePurchaseQueries();
  const { data, isLoading, isError, error } = useSearchPurchasePage();

  useEffect(() => {
    updateFilters({ page_size: settings.rowsPerPage });
  }, [settings.rowsPerPage, updateFilters]);

  const renderStatus = (status: PurchaseStatus) => {
    switch (status) {
      case PurchaseStatus.COMPLETED:
        return <Badge variant="default">Completed</Badge>;
      case PurchaseStatus.PENDING:
        return <Badge variant="outline">Pending</Badge>;
      case PurchaseStatus.CANCELLED:
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const columns: Column<QueryPurchaseDto>[] = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (value) => <div className="font-medium">{value}</div>,
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (value, item) => formatMoney(value),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (value) => format(new Date(value), "PPP"),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      render: (value) => renderStatus(value),
    },
  ];

  const actions: Action<QueryPurchaseDto>[] = [
    {
      label: "View Details",
      icon: Eye,
      onClick: (purchase) => handleViewDetails(purchase),
    },
    {
      label: "Download Receipt",
      icon: FileDown,
      onClick: (purchase) => {
        console.log("Receipt", purchase.id);
      },
    },
    {
      label: "Contact Support",
      icon: MessageCircle,
      onClick: (purchase) => {
        console.log("Support", purchase.id);
      },
    },
  ];

  const handleViewDetails = (purchase: QueryPurchaseDto) => {
    setCurrentPurchase(purchase);
    setViewPurchaseDetail(true);
  };

  return (
    <>
      <DataTable
        columns={columns}
        actions={actions}
        dataPage={data!}
        isLoading={isLoading}
        isError={isError}
        error={error}
        currentPage={filters.page!}
        updateFilters={updateFilters}
        isRowClickable={true}
        onRowClick={(purchase) => handleViewDetails(purchase)}
      />

      <PurchaseDetailComponent />
    </>
  );
}
