import { QueryReferrerTrustAwardDto, ReferrerTrustAwardCategoryKey } from "@components/trust-network/referrer/leaderboard/models";
import { referrerLeaderBoard } from "@data/mock-trust-network";
import { NextRequest, NextResponse } from "next/server";

// GET all or search/filter

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);


  // Apply filters
  let filtered = referrerLeaderBoard.filter((p) => {
    let matches = true;

    
      matches = matches && !p.category.toLowerCase().includes(ReferrerTrustAwardCategoryKey.HALL_OF_INTEGRITY);
    

    // if (user_id) {
    //   matches = matches && (p.direct_referrer_code === activeAuditor.referral_code || p.indirect_referrer_code === activeAuditor.referral_code);
    // } else {
    //   // user_id is mandatory
    //   matches = false;
    // }

    return matches;
  });

  // Apply sorting
  filtered.sort(
    (a, b) =>
      new Date(b.date_created!).getTime() - new Date(a.date_created!).getTime()
  );

  return NextResponse.json(filtered);
}
