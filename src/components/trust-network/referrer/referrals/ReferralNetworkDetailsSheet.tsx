import DetailDrawer, { DetailDrawerWidth } from "@components/ui/DetailDrawer";
import { useReferralUserStore } from "./libs/useReferralUserStore";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@components/3rdparty/ui/avatar";
import { Badge } from "@components/3rdparty/ui/badge";
import { Progress } from "@components/3rdparty/ui/progress";
import { useReferralUserQueries } from "./libs/useReferralUserQueries";
import { QueryReferralUserDto } from "./models";
import { Page } from "types/models";
import InfiniteScrollTriggerComponent from "@components/ui/InfiniteScrollTriggerComponent";
import { motion } from "framer-motion";
import { formatDate } from "@lib/time";

export default function ReferralNetworkDetailsSheet() {
  const {
    currentReferral,
    setCurrentReferral,
    viewCurrentReferralNetwork,
    setViewCurrentReferralNetwork,
  } = useReferralUserStore();

  const { useSearchReferralUserInfinite } = useReferralUserQueries();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchReferralUserInfinite(currentReferral?.id!);

  // Flattened data
  const allReferrals =
    data?.pages.flatMap((page: Page<QueryReferralUserDto>) => page.items) ?? [];

  return (
    <DetailDrawer
      open={viewCurrentReferralNetwork}
      onOpenChange={(open: any) => {
        setViewCurrentReferralNetwork(false);
        if (!open) {
          // Delay clearing until AFTER exit animation finishes
          setTimeout(() => setCurrentReferral(null), 300);
        }
      }}
      title={`${currentReferral?.fullname}'s Network`}
      reference={currentReferral?.referral_code!}
      description={`These are your indirect referrals through ${currentReferral?.fullname}`}
      drawerWidth={DetailDrawerWidth.SMALL}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        {allReferrals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No recent activities</p>
          </div>
        ) : (
          allReferrals.map((referral) => (
            <div
              key={referral.id}
              className="flex items-center gap-4 p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors"
            >
              <Avatar>
                <AvatarImage src={referral.avatar} alt={referral.fullname} />
                <AvatarFallback>
                  {referral.fullname
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">
                    {referral.fullname}
                  </p>
                  {referral.is_active && (
                    <Badge variant="secondary" className="text-xs">
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Joined {formatDate(referral.date_created!)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">
                    Trust Score
                  </p>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={referral.trust_score}
                      className="w-16 h-2"
                    />
                    <span className="text-sm font-medium">
                      {referral.trust_score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </motion.div>

      <InfiniteScrollTriggerComponent
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </DetailDrawer>
  );
}
