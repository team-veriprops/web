import { formatDate } from "@lib/time";
import { useDisputeStore } from "../libs/useDisputeStore";
import { useDisputeQueries } from "../libs/useDisputeQueries";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import { QueryDisputeResolutionTimelineDto } from "../models";
import { Page } from "types/models";
import InfiniteScrollTriggerComponent from "@components/ui/InfiniteScrollTriggerComponent";
import { AlertCircle, Clock, Loader2 } from "lucide-react";

export default function DisputeDetailsMetadata() {
  const { currentDispute } = useDisputeStore();
  const { activeAuditor } = useAuthStore();
  const { useSearchDisputeResolutionTimelineInfinite } = useDisputeQueries();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSearchDisputeResolutionTimelineInfinite(
      activeAuditor?.id!,
      currentDispute?.id!
    );

  // Flattened data
  const allDisputeResolutionTimelines =
    data?.pages.flatMap(
      (page: Page<QueryDisputeResolutionTimelineDto>) => page.items
    ) ?? [];

  return (
    <div className="space-y-6 px-6 py-4">
      {/* Metadata */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Metadata</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium text-foreground">
              {currentDispute?.type}
            </span>
          </div>
          {currentDispute?.related_tran_id && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Related Txn</span>
              <span className="font-mono text-foreground">
                {currentDispute?.related_tran_id}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Created</span>
            <span className="text-foreground">
              {formatDate(currentDispute?.date_created!)}
            </span>
          </div>
          {currentDispute?.date_updated && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Updated</span>
              <span className="text-foreground">
                {formatDate(currentDispute?.date_updated!)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold text-foreground mb-2">Description</h3>
        <p className="text-sm text-foreground">{currentDispute?.description}</p>
      </div>

      {/* Resolution Timeline */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">
          Resolution Timeline
        </h3>
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-center h-full py-12">
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Fetching resolution timelines...
            </div>
          ) : allDisputeResolutionTimelines.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center h-full py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No resolution timeline yet!
              </p>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Hang in there, we will revert shortly.
              </p>
            </div>
          ) : (
            <>
              {allDisputeResolutionTimelines.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {item.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(item.date_created!)}
                    </p>
                    {item.notes && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          <InfiniteScrollTriggerComponent
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>
    </div>
  );
}
