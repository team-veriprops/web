"use client";

import { PageDetails } from "types/models";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import { useUI } from "@stores/useStore";
import { buildReferralLink } from "@lib/utils";
import LeaderboardHero from "./LeaderboardHero";
import ReferrerLeaderboardWinnersComponent from "./leaderboard_winners/ReferrerLeaderboardWinnersComponent";
import RankingsCard from "./rankings/RankingsCard";

export default function ReferrerLeaderboardComponentPage({
  title,
  description,
}: PageDetails) {
  const { activeAuditor } = useAuthStore();
  const { setShareModalOpen } = useUI();
  const defaultMessage = "Share link";
  const referralLink = buildReferralLink(activeAuditor?.referral_code!);

  return (
    <>
      <LeaderboardHero title={title} description={description} />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <ReferrerLeaderboardWinnersComponent />

        {/* Rankings Card */}
        <div id="rankings-card">
          <RankingsCard />
        </div>
      </div>
    </>
  );
}
