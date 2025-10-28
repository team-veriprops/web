import VerifierComponentPage from "@components/trust-network/verifier/VerifierComponentPage";
import { Metadata } from "next";

const title = "Welcome back";
const description =
  "Here are your assigned verification tasks. Let's build trust, one property at a time.";

export const metadata: Metadata = {
  title: `${title} | Veriprops`,
  description: description,
};

export default function VerifierPage() {
  return <VerifierComponentPage title={title} description={description} />;
}
