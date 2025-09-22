import { Metadata } from "next";
import "@app/globals.css";
import Footer from "@components/website/footer/Footer";
import { MobileBottomNav, Navigation } from '@components/website/Navigation';
import { ClarityPageTracker } from "@components/microsoft-clarity/clarity-tracker";
import { ClarityProvider } from "@components/microsoft-clarity/clarity-provider";
import { AuthModal } from "@components/user/auth/AuthModal";
import { Suspense } from "react";
import PreFooterNavigation from "@components/website/footer/PreFooterNavigation";
import PropertyComparisonModal from "@components/website/property/PropertyComparisonModal";

// export const metadata: Metadata = {
//   title: "appodus - Strategic Tech Partner for Fast-Moving Startups",
//   description: "Build Fast. Scale Smart. We help founders turn ideas into fast-moving products with full-cycle execution: web apps, mobile apps, dashboards, and more.",
//   icons: {
//     icon: '/favicon.png',
//   },
// };

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <PreFooterNavigation />
        <Footer />
        
        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
        
        {/* Bottom Padding for Mobile Navigation */}
        <div className="h-20 md:h-0" />

        <PropertyComparisonModal />
      </div>
  );
}
