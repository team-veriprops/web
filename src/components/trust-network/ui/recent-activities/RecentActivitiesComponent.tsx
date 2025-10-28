import { Card } from "@3rdparty/ui/card";
import { Button } from "@3rdparty/ui/button";
import { AlertCircle } from "lucide-react";
import RecentActivityRowComponent from "./RecentActivityRowComponent";
import { QueryActivityEventDto } from "@components/trust-network/ui/recent-activities/models";
import { useActivityEventQueries } from "./libs/useActivityEventQueries";
import { useEffect, useRef } from "react";
import { Page } from "types/models";
import InfiniteScrollTriggerComponent from "@components/ui/InfiniteScrollTriggerComponent";
import { useDisputeStore } from "@components/trust-network/disputes/libs/useDisputeStore";
import { RaiseDisputeModal } from "@components/trust-network/disputes/RaiseDisputeModal";

export default function RecentActivitiesComponent() {
  const { setNewDisputeModalOpened } = useDisputeStore();
  const { useSearchActivityEventInfinite } = useActivityEventQueries();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchActivityEventInfinite();

  // Flattened data
  const allActivities =
    data?.pages.flatMap((page: Page<QueryActivityEventDto>) => page.items) ??
    [];

  const raiseActivityDispute = (activity: QueryActivityEventDto) => {
    setNewDisputeModalOpened(true);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Recent Activities
          </h3>
          <p className="text-sm text-muted-foreground">
            Your latest trust network activity
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={setNewDisputeModalOpened.bind(null, true)}
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          Raise Dispute
        </Button>
      </div>

      <div className="space-y-2">
        {allActivities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No recent activities</p>
          </div>
        ) : (
          allActivities.map((activity) => (
            <RecentActivityRowComponent
              key={activity.id}
              activity={activity}
              onRaiseDispute={(activity: QueryActivityEventDto) =>
                raiseActivityDispute(activity)
              }
            />
          ))
        )}

        <InfiniteScrollTriggerComponent
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>

      <RaiseDisputeModal />
    </Card>
  );
}
