import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@3rdparty/ui/card";
import { motion, useReducedMotion } from "framer-motion";
import { Users, Network } from "lucide-react";
import { useReferralUserQueries } from "./libs/useReferralUserQueries";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import { AsyncStateComponent } from "@components/ui/AsyncStateComponent";

export const ReferralsSummaryCards = () => {
  const { activeAuditor } = useAuthStore();
  const { useGetReferralUserStats } = useReferralUserQueries();

  const {
    data: userReferralStats,
    isLoading,
    isError,
  } = useGetReferralUserStats(activeAuditor?.id!);

  const shouldReduceMotion = useReducedMotion();
  const AnimatedNumber = ({ value }: { value: number }) => {
    if (shouldReduceMotion) {
      return <span>{value}</span>;
    }

    return (
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.span>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <Card
        tabIndex={0}
        role="button"
        aria-label={`Direct Referrals: ${userReferralStats?.directReferralCount}`}
        className="cursor-pointer hover:shadow-lg transition-shadow focus:ring-2 focus:ring-primary focus:outline-none"
        // onClick={() => onCardClick?.("direct")}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter" || e.key === " ") {
        //     e.preventDefault();
        //     onCardClick?.("direct");
        //   }
        // }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Direct Referrals
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <AsyncStateComponent
            isLoading={isLoading}
            isError={isError}
            data={userReferralStats}
            loadingText="Loading your direct referral count..."
            errorText="Failed to load your direct referral count, please try again later."
            emptyText="0"
          >
            {() => (
              <div className="text-3xl font-bold">
                <AnimatedNumber
                  value={userReferralStats?.directReferralCount!}
                />
              </div>
            )}
          </AsyncStateComponent>
          <CardDescription className="mt-1">
            People you directly invited
          </CardDescription>
        </CardContent>
      </Card>
      <Card
        tabIndex={0}
        role="button"
        aria-label={`Indirect Referrals: ${userReferralStats?.indirectReferralCount}`}
        className="cursor-pointer hover:shadow-lg transition-shadow focus:ring-2 focus:ring-primary focus:outline-none"
        // onClick={() => onCardClick?.("indirect")}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter" || e.key === " ") {
        //     e.preventDefault();
        //     onCardClick?.("indirect");
        //   }
        // }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Indirect Referrals
          </CardTitle>
          <Network className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <AsyncStateComponent
            isLoading={isLoading}
            isError={isError}
            data={userReferralStats}
            loadingText="Loading your indirect referral count..."
            errorText="Failed to load your indirect referral count, please try again later."
            emptyText="0"
          >
            {() => (
              <div className="text-3xl font-bold">
                <AnimatedNumber
                  value={userReferralStats?.indirectReferralCount!}
                />
              </div>
            )}
          </AsyncStateComponent>
          <CardDescription className="mt-1">
            People your referrals brought in
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};
