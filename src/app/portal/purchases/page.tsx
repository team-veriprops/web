import PurchasesComponentPage from "@components/portal/purchases/PurchasesComponentPage";
import { Metadata } from "next";

const title = "My Purchases";
const description =
  "Manage all the lands, houses, and services you’ve purchased on Veriprops. Track purchase status, download receipts, and access support for each property or service.";

export const metadata: Metadata = {
  title: `${title} | Veriprops`,
  description: description,
};

export default function PurchasesPage() {
  return <PurchasesComponentPage title={title} description={description} />;
}
