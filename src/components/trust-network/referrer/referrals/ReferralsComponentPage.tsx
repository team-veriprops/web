"use client";

import { PageDetails } from "types/models";
import { ReferralsSummaryCards } from "./ReferralsSummaryCards";
import ReferralsTableComponent from "./ReferralsTableComponent";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import { useUI } from "@stores/useStore";
import { buildReferralLink } from "@lib/utils";
import ReferrerHeader from "../ReferrerHeader";
import { Button } from "@components/3rdparty/ui/button";
import { UserPlus } from "lucide-react";
import ShareModal from "@components/ui/ShareModal";

export default function ReferralsComponentPage({
  title,
  description,
}: PageDetails) {
  const { activeAuditor } = useAuthStore();
  const { setShareModalOpen } = useUI();
  const defaultMessage = "Share link";
  const referralLink = buildReferralLink(activeAuditor?.referral_code!);

  return (
    <>
      <ReferrerHeader title={title} description={description}>
        <div>
          <Button size={"sm"} onClick={setShareModalOpen.bind(null, true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite More Friends
          </Button>

          <ShareModal extLink={referralLink} defaultMessage={defaultMessage} />
        </div>
      </ReferrerHeader>

      <div className="container mx-auto px-4 py-8">
        <ReferralsSummaryCards />
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Direct Referrals</h2>
          <ReferralsTableComponent />
        </div>
      </div>
    </>
  );
}
