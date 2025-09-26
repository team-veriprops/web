import Team from "@components/portal/team/Team";
import { Metadata } from "next";

const title = "Team & Access";
const description = "Manage your team members, roles, and access levels.";

export const metadata: Metadata = {
  title: `${title} | Veriprops`,
  description: description,
};

export default function TeamPage() {
  return <Team title={title} description={description} />;
}
