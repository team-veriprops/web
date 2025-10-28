import ReferrerComponentPage from "@components/trust-network/referrer/ReferrerComponentPage";
import { Metadata } from "next";

const title = "Trust Network";
const description =
  "Your Trust Score measures verified activity and responsible behavior";

export const metadata: Metadata = {
  title: `${title} | Veriprops`,
  description: description,
};

export default function ReferrerPage() {
  return <ReferrerComponentPage title={title} description={description} />;
}
