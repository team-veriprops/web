"use client";

import { PageDetails } from "types/models";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import { useUI } from "@stores/useStore";
import { buildReferralLink } from "@lib/utils";
import { Button } from "@components/3rdparty/ui/button";
import { Filter, Plus, UserPlus } from "lucide-react";
import PageHeader from "@components/ui/PageHeader";
import { DisputesOverviewCards } from "./DisputesOverviewCards";
import { disputeStatuses, QueryDisputeStatsDto } from "./models";
import { DisputesTable } from "./DisputesTable";
import { Card, CardContent } from "@components/3rdparty/ui/card";
import { TableToolbar } from "@components/ui/TableToolbar";
import { useDisputeStore } from "./libs/useDisputeStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/3rdparty/ui/select";
import { RaiseDisputeModal } from "./RaiseDisputeModal";

export default function DisputesComponentPage({
  title,
  description,
}: PageDetails) {
  const { activeAuditor } = useAuthStore();
  const { setShareModalOpen } = useUI();
  const defaultMessage = "Share link";
  const referralLink = buildReferralLink(activeAuditor?.referral_code!);

  const { updateDisputeFilters, disputeFilters, setNewDisputeModalOpened } = useDisputeStore();

  const onSearchQueryChange = (searchQuery: string) => {
    updateDisputeFilters({ query: searchQuery });
  };
  return (
    <>
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex items-center justify-between">
            <PageHeader title={title} description={description} />
            <Button size={"sm"} onClick={setNewDisputeModalOpened.bind(null, true)}>
              <Plus className="h-4 w-4 mr-2" />
              Raise Dispute
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <DisputesOverviewCards />
        <h2 className="text-2xl font-semibold mt-4 mb-4"  id="dispute-table">Your Disputes</h2>
        <Card>
          <CardContent className="p-6">
            <TableToolbar
              onSearchQueryChange={onSearchQueryChange}
              searchPlaceholder={"Search by ID, transaction, or description..."}
            >
              <Select
                value={disputeFilters.status}
                onValueChange={(selectedStatus: any) =>
                  updateDisputeFilters({ status: selectedStatus })
                }
              >
                
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder={"Select status"} />
                </SelectTrigger>
                <SelectContent>
                  {disputeStatuses.map((status, index) => (
                    <SelectItem key={index} value={status.key}>
                      {status.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableToolbar>

            <DisputesTable />
          </CardContent>
        </Card>

        <RaiseDisputeModal />
      </div>
    </>
  );
}
