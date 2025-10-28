import { motion } from "framer-motion";
import { AlertCircle, Clock, CheckCircle2, TrendingUp, X } from "lucide-react";
import { Card, CardContent } from "@3rdparty/ui/card";
import {
  DisputeStatus,
  DisputeStatusDetail,
} from "./models";
import { useDisputeQueries } from "./libs/useDisputeQueries";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import { useEffect, useState } from "react";
import { AsyncStateComponent } from "@components/ui/AsyncStateComponent";
import { useDisputeStore } from "./libs/useDisputeStore";
import { cn } from "@lib/utils";

export const DisputesOverviewCards = () => {
  const { activeAuditor } = useAuthStore();

  const { updateDisputeFilters } = useDisputeStore();
  const [open, setOpen] = useState<number>();
  const [underReview, setUnderReview] = useState<number>();
  const [escalated, setEscalated] = useState<number>();
  const [resolved, setResolved] = useState<number>();
  const [dismissed, setDismissed] = useState<number>();
  const [avgResolutionTimeHours, setAvgResolutionTimeHours] =
    useState<number>();

  const { useGetDisputeStats } = useDisputeQueries();
  const {
    data: userDisputeStats,
    isLoading,
    isError,
  } = useGetDisputeStats(activeAuditor?.id!);

  useEffect(() => {
    setOpen(userDisputeStats?.open);
    setUnderReview(userDisputeStats?.underReview);
    setEscalated(userDisputeStats?.escalated);
    setResolved(userDisputeStats?.resolved);
    setDismissed(userDisputeStats?.dismissed);
    setAvgResolutionTimeHours(userDisputeStats?.avg_resolution__hours);
  }, [userDisputeStats]);

  const disputeStatusesDetails: DisputeStatusDetail[] = [
    {
      key: "open",
      title: "Open",
      value: open,
      icon: AlertCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      key: "under_review",
      title: "Under Review",
      value: underReview,
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      key: "escalated",
      title: "Escalated",
      value: escalated,
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      key: "dismissed",
      title: "Dismissed",
      value: dismissed,
      icon: X,
      color: "text-orange-800",
      bgColor: "bg-orange-800/10",
    },
    {
      key: "resolved",
      title: "Resolved",
      value: resolved,
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      key: "avg_resolution",
      title: "Avg Resolution",
      value: `${avgResolutionTimeHours}h`,
      icon: Clock,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      subtitle: "average time",
    },
  ];

  const isClickable = (key: string) => key !== "avg_resolution";

  const handleOnClick = (key: string) => {
    if (isClickable(key)) {
      updateDisputeFilters({ status: key! as DisputeStatus });
      requestAnimationFrame(() => {
        document
          .getElementById("dispute-table")
          ?.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  return (
    <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"}>
      {disputeStatusesDetails.map((disputeStatusesDetail, index) => {
        const Icon = disputeStatusesDetail.icon;
        return (
          <motion.div
            key={disputeStatusesDetail.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className={cn(
                "p-6 transition-all hover:shadow-card",
                isClickable(disputeStatusesDetail.key)
                  ? "cursor-pointer hover:scale-105"
                  : ""
              )}
              onClick={handleOnClick.bind(null, disputeStatusesDetail.key)}
            >
              <CardContent className="p-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {disputeStatusesDetail.title}
                    </p>
                    <AsyncStateComponent
                      isLoading={isLoading}
                      isError={isError}
                      data={userDisputeStats}
                      loadingText={"Loading stats..."}
                      errorText={`Failed to load ${disputeStatusesDetail.title} disputes, please try again later.`}
                      emptyText="No stats found."
                    >
                      {() => (
                        <p className="text-2xl font-bold text-foreground">
                          {disputeStatusesDetail.value}
                        </p>
                      )}
                    </AsyncStateComponent>

                    {disputeStatusesDetail.subtitle && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {disputeStatusesDetail.subtitle}
                      </p>
                    )}
                  </div>
                  <div
                    className={`p-2 rounded-lg ${disputeStatusesDetail.bgColor}`}
                  >
                    {Icon && (
                      <Icon
                        className={`h-5 w-5 ${disputeStatusesDetail.color}`}
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
