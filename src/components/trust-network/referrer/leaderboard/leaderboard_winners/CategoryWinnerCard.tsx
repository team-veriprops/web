import { motion } from "framer-motion";
import { Card } from "@3rdparty/ui/card";
import { Badge } from "@3rdparty/ui/badge";
import {
  Trophy,
  Users,
  DollarSign,
  Shield,
  TrendingUp,
  Award,
} from "lucide-react";
import { formatMoney } from "@lib/utils";
import {
  QueryReferrerTrustAwardDto,
  ReferrerTrustAwardCategories,
  ReferrerTrustAwardCategory,
  ReferrerTrustAwardCategoryKey,
} from "../models";
import { AsyncStateComponent } from "@components/ui/AsyncStateComponent";
import { useEffect, useState } from "react";

interface CategoryWinnerCardProps {
  isLoading: boolean;
  isError: boolean;
  categoryKey: ReferrerTrustAwardCategoryKey;
  categoryWinner: QueryReferrerTrustAwardDto;
  index: number;
  onClick: () => void;
}

const iconMap = {
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  Award,
  Trophy,
};

export const getReferrerTrustAwardCategory = (
  categoryKey: ReferrerTrustAwardCategoryKey
): ReferrerTrustAwardCategory | undefined => {
  return ReferrerTrustAwardCategories.find(
    (referrerTrustAwardCategory) =>
      referrerTrustAwardCategory.key === categoryKey
  );
};

export const getReferrerMetricDisplay = (
  referrerTrustAwardCategory: ReferrerTrustAwardCategory,
  categoryWinner: QueryReferrerTrustAwardDto
) => {
  switch (referrerTrustAwardCategory?.metricKey) {
    case "trust_score":
      return `${categoryWinner?.trust_score} TPS`;
    case "direct_referral_count":
      return `${categoryWinner?.direct_referral_count} referrals`;
    case "amount_earned":
      return formatMoney(categoryWinner?.amount_earned);
    case "disputes_count":
      return `${categoryWinner?.direct_referral_count} referrals`; // TODO: change direct_referral_count to a better value
    case "added_trust_score":
      return `+${categoryWinner?.added_trust_score} TPS`;
    case "has_integrity_badge":
      return `${categoryWinner?.trust_score} TPS`;
    default:
      return "";
  }
};

export default function CategoryWinnerCard({
  isLoading,
  isError,
  categoryKey,
  categoryWinner,
  index,
  onClick,
}: CategoryWinnerCardProps) {
  const [referrerTrustAwardCategory, setReferrerTrustAwardCategory] =
    useState<ReferrerTrustAwardCategory>();

  useEffect(() => {
    setReferrerTrustAwardCategory(getReferrerTrustAwardCategory(categoryKey)!);
  }, [categoryKey]);

  const Icon =
    iconMap[referrerTrustAwardCategory?.icon as keyof typeof iconMap] || Trophy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card
        className="group cursor-pointer p-6 transition-all hover:shadow-card hover:scale-105"
        onClick={onClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="mb-2 text-sm text-muted-foreground">
              {referrerTrustAwardCategory?.name}
            </p>

            <AsyncStateComponent
              isLoading={isLoading}
              isError={isError}
              data={categoryWinner}
              loadingText={`Loading ${referrerTrustAwardCategory?.name} winner...`}
              errorText={`Failed to load ${referrerTrustAwardCategory?.name} winner, please try again later.`}
              emptyText="No winner yet"
            >
              {() => (
                <>
                  <h3 className="mb-1 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {categoryWinner.fullname}
                  </h3>
                  <Badge variant="outline" className="mb-3 text-xs">
                    {categoryWinner.tier_name}
                  </Badge>
                  <p className="text-2xl font-bold text-reward">
                    {getReferrerMetricDisplay(referrerTrustAwardCategory!, categoryWinner)}
                  </p>
                </>
              )}
            </AsyncStateComponent>
          </div>
          <Icon className="h-8 w-8 text-reward" />
        </div>
      </Card>
    </motion.div>
  );
}
