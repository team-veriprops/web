import ActivitiesComponentPage from "@components/trust-network/activities/ActivitiesComponentPage";
import { Metadata } from "next";

const title = "Activities";
const description =
  "See all the activities involving your account, you can also raise a dispute.";

export const metadata: Metadata = {
  title: `${title} | Veriprops`,
  description: description,
};

export default function ActivitiesPage(){
    return (
        <ActivitiesComponentPage title={title} description={description} />
    )
}