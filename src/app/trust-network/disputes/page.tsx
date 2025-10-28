import DisputesComponentPage from "@components/trust-network/disputes/DisputesComponentPage";
import { Metadata } from "next";

const title = "Disputes";
const description =
  "We'll help resolve issues quickly and fairly.";

export const metadata: Metadata = {
  title: `${title} | Veriprops`,
  description: description,
};

export default function DisputesPage(){
    return (
        <DisputesComponentPage title={title} description={description} />
    )
}
