"use client";

import "@app/globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useIsMobile } from "@hooks/use-mobile";
import { ReactNode, useEffect, useState } from "react";
import Breadcrumbs from "@components/portal/navigation/Breadcrumbs";
import DesktopSidebar from "@components/portal/navigation/DesktopSidebar";
import MobileTopNav from "@components/portal/navigation/MobileTopNav";
import OnboardingModal from "@components/portal/onboarding/OnboardingModal";
import { MobileBottomNav } from "@components/website/Navigation";
import DesktopTopNav from "@components/portal/navigation/TopNav";
import TopNav from "@components/portal/navigation/TopNav";

// export const metadata: Metadata = {
//   title: "Veriprops Portal",
//   description: "Trusted marketplace for verified properties",
// };

export default function PortalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex">
      {isMobile ? (
        <div className="w-full min-h-screen">
          <MobileTopNav />

          <main className="p-6 pb-20">{children}</main>

          <MobileBottomNav />

          <OnboardingModal />
        </div>
      ) : (
        <>
          <div className="w-64">
            <DesktopSidebar />
          </div>

          <div className="flex-1 flex flex-col">
            <header className="border-b border-border bg-background">
              <div className="flex items-center justify-between px-6 py-4">
                <Breadcrumbs pathname={pathname} />

                <div className="flex items-center space-x-4">
                  <TopNav />
                </div>
              </div>
            </header>

            <main className="flex-1 p-6">{children}</main>

            <OnboardingModal />
          </div>
        </>
      )}
    </div>
  );
}
