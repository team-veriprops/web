"use client";

import { motion } from "framer-motion";
import ReferrerHeader from "./ReferrerHeader";
import { PageDetails } from "types/models";
import WelcomeCardComponent from "../ui/WelcomeCardComponent";
import { useTrustNetworkQueries } from "../libs/useTrustNetworkQueries";
import { AsyncStateComponent } from "@components/ui/AsyncStateComponent";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import ReferralLinkCardComponent from "./ReferralLinkCardComponent";
import RecentActivitiesComponent from "../ui/recent-activities/RecentActivitiesComponent";
import TrustPerformanceScoreComponent from "@components/ui/TrustPerformanceScoreComponent";

export default function ReferrerComponentPage({
  title,
  description,
}: PageDetails) {
  const { activeAuditor } = useAuthStore();
  const { useGetTrustNetwork } = useTrustNetworkQueries();

  const {
    data: userTrustNetwork,
    isLoading,
    isError,
  } = useGetTrustNetwork(activeAuditor?.id!);
  return (
    <>
      <ReferrerHeader
        title={title}
        description={description}
      >
        <AsyncStateComponent
          isLoading={isLoading}
          isError={isError}
          data={userTrustNetwork?.current_r_tps!}
          loadingText="Loading your TPS..."
          errorText="Failed to load your TPS."
          emptyText="No TPS found."
        >
          {() => (
            <TrustPerformanceScoreComponent
              trustScore={userTrustNetwork?.current_r_tps!}
            />
          )}
        </AsyncStateComponent>
      </ReferrerHeader>
      <AsyncStateComponent
        isLoading={isLoading}
        isError={isError}
        data={userTrustNetwork}
        loadingText="Loading your trust network details..."
        errorText="Failed to load your trust network details, please try again later."
        emptyText="No trust network details found."
      >
        {() => (
          <div className="container mx-auto px-4 py-8 space-y-6">
            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <WelcomeCardComponent
                firstName={activeAuditor?.first_name!}
                tierId={userTrustNetwork?.current_r_tier_key!}
                currentTPS={userTrustNetwork?.current_r_tps!}
                progressPercent={
                  userTrustNetwork?.next_r_tier_progress_percent!
                }
                requiredReferrals={
                  userTrustNetwork?.next_r_tier_required_referrals!
                }
                nextTierName={userTrustNetwork?.next_r_tier_name}
                nextTierMinTPS={userTrustNetwork?.next_r_tier_min_tps}
              />
            </motion.div>

            {/* Summary Cards Row */}
            {/* <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <TotalBalanceCard
              available={wallet.available}
              escrow={wallet.escrow}
              lifetimeInflow={wallet.lifetimeInflow}
              lifetimeOutflow={wallet.lifetimeOutflow}
              canWithdraw={canWithdraw}
              onWithdraw={() => setShowWithdrawModal(true)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <ReferralsCard
              directTotal={referrals.directTotal}
              indirectTotal={referrals.indirectTotal}
              monthlyTrend={referrals.monthlyTrend}
              timeframe={timeframe}
              onTimeframeChange={(value) => setTimeframe(value as any)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <LifetimeEarningsCard
              lifetimeInflow={wallet.lifetimeInflow}
              lifetimeOutflow={wallet.lifetimeOutflow}
            />
          </motion.div>
        </div> */}

            {/* Referral Link Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <ReferralLinkCardComponent />
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <RecentActivitiesComponent />
            </motion.div>
          </div>
        )}
      </AsyncStateComponent>
    </>
  );
}
