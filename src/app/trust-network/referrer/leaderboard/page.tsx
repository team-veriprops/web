import ReferrerLeaderboardComponentPage from "@components/trust-network/referrer/leaderboard/ReferralsComponentPage";
import { Metadata } from "next";

const title = "Trust Network Leaderboards";
const description =
  "Celebrating those who build trust and protect our community";

export const metadata: Metadata = {
  title: `${title} | Veriprops`,
  description: description,
};

export default function ReferrerPage() {
  return (
    <ReferrerLeaderboardComponentPage title={title} description={description} />
  );
}
