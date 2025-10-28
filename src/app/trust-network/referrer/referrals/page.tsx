import ReferralsComponentPage from "@components/trust-network/referrer/referrals/ReferralsComponentPage";
import { Metadata } from "next";

const title = "Referrals";
const description =
  "See how your Trust Network grows and the value each connection creates.";

export const metadata: Metadata = {
  title: `${title} | Veriprops`,
  description: description,
};

export default function ReferrerPage() {
  return <ReferralsComponentPage title={title} description={description} />;
}
