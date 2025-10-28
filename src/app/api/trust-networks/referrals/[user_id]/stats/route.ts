import {
  QueryReferralUserDto,
  QueryReferralUserStatsDto,
} from "@components/trust-network/referrer/referrals/models";
import { Money } from "@components/website/property/models";
import { referrals } from "@data/mock-trust-network";
import { getActiveAuditor } from "@data/mock-users";
import { NextRequest, NextResponse } from "next/server";

// GET one
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  const { user_id } = await params;
  console.log("Query params:", user_id);

  const activeAuditor = await getActiveAuditor()

  const filterReferrals = referrals.filter(
    (referral) =>
      referral.direct_referrer_code ===  activeAuditor.referral_code ||
      referral.indirect_referrer_code === activeAuditor.referral_code
  );
  const stats: QueryReferralUserStatsDto = calculateReferralStats(
    activeAuditor.referral_code!,
    filterReferrals
  );

  return stats
    ? NextResponse.json(stats)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

function calculateReferralStats(
  referral_code: string,
  referrals: QueryReferralUserDto[]
): QueryReferralUserStatsDto {
  let directReferralCount = 0;
  let indirectReferralCount = 0;
  let totalAmountEarned: Money | undefined = undefined;

  for (const r of referrals) {
    if (r.direct_referrer_code === referral_code) directReferralCount++;

    if (r.indirect_referrer_code === referral_code) indirectReferralCount++;

    if (!totalAmountEarned) {
      totalAmountEarned = r.contribution_to_direct_referrer.amount;
    } else {
      totalAmountEarned = totalAmountEarned.plus(
        r.contribution_to_direct_referrer.amount
      );
    }
  }

  return {
    directReferralCount,
    indirectReferralCount,
    totalAmountEarned: totalAmountEarned!,
  };
}
