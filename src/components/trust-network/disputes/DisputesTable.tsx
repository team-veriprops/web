import { motion } from "framer-motion";
import { Badge } from "@3rdparty/ui/badge";
import { Button } from "@3rdparty/ui/button";
import { Eye, AlertCircle, Loader2 } from "lucide-react";
import { useDisputeQueries } from "./libs/useDisputeQueries";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import { Page } from "types/models";
import { QueryDisputeDto } from "./models";
import InfiniteScrollTriggerComponent from "@components/ui/InfiniteScrollTriggerComponent";
import { useDisputeStore } from "./libs/useDisputeStore";
import DisputeDetailsDrawer from "./details/DisputeDetailsDrawer";
import { formatDate } from "@lib/time";

export const DisputesTable = () => {
  const { activeAuditor } = useAuthStore();

  const { useSearchDisputeInfinite } = useDisputeQueries();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSearchDisputeInfinite(activeAuditor?.id!);

  const { setCurrentDispute, setViewCurrentDispute } = useDisputeStore();

  // Flattened data
  const allDisputes =
    data?.pages.flatMap((page: Page<QueryDisputeDto>) => page.items) ?? [];

  const getStatusVariant = (
    status: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Open":
        return "default";
      case "Under Review":
        return "secondary";
      case "Escalated":
        return "destructive";
      case "Resolved":
        return "outline";
      case "Dismissed":
        return "outline";
      default:
        return "outline";
    }
  };

  const onViewDispute = (dispute: QueryDisputeDto) => {
    setCurrentDispute(dispute);
    setViewCurrentDispute(true);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Fetching data...
        </div>
      ) : allDisputes.length === 0 ? (
        <div className="py-12 text-center border border-border rounded-lg">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No disputes found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {allDisputes.map((dispute, index) => (
            <motion.div
              key={dispute.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-sm font-medium text-foreground">
                      {dispute.ref_id}
                    </span>
                    <Badge variant={getStatusVariant(dispute.status)}>
                      {dispute.status}
                    </Badge>
                    <Badge variant="outline" className="bg-muted">
                      {dispute.type}
                    </Badge>
                  </div>

                  <p className="text-sm text-foreground mb-2 line-clamp-2">
                    {dispute.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{formatDate(dispute.date_created!)}</span>
                    {dispute.related_tran_id && (
                      <span className="font-mono">
                        Txn: {dispute.related_tran_id}
                      </span>
                    )}
                    <span>{dispute.conversion_count || 0} messages</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDispute(dispute)}
                  className="shrink-0"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </motion.div>
          ))}

          <InfiniteScrollTriggerComponent
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      )}

      <DisputeDetailsDrawer />
    </>
  );
};
