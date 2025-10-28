'use client'

import "@app/globals.css";
import { ReactNode } from "react";
import TrustNetworkHeader from "@components/trust-network/TrustNetworkHeader";
import TrustNetworkFooter from "@components/trust-network/TrustNetworkFooter";
import { useAuthQueries } from "@components/user/auth/libs/useAuthQueries";

export default function PortalLayout({ children }: { children: ReactNode }) {
  // Get Auth Details
  const { useGetAuth } = useAuthQueries();
  useGetAuth();

  return (
    <div className="min-h-screen bg-background">
      <TrustNetworkHeader />
      {children}
      <TrustNetworkFooter />
    </div>
  );
}
