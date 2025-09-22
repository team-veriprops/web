
import { MyForSaleComponent } from "@components/portal/my-for-sale/MyForSaleComponent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "My For Sale | Veriprops",
  description: "Manage your profile, security, notifications, and contract details",
};

export default function MyForSalePage() {
  return <MyForSaleComponent />;
}
