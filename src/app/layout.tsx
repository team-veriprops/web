import { Metadata } from "next";
import "@app/globals.css";
import { ClarityPageTracker } from "@components/microsoft-clarity/clarity-tracker";
import { ClarityProvider } from "@components/microsoft-clarity/clarity-provider";
import { AuthModal } from "@components/user/auth/AuthModal";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "appodus - Strategic Tech Partner for Fast-Moving Startups",
  description: "Build Fast. Scale Smart. We help founders turn ideas into fast-moving products with full-cycle execution: web apps, mobile apps, dashboards, and more.",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className=""
      >
        {children}
      <ClarityProvider />
      <ClarityPageTracker />
        <Suspense fallback={null}>
          <AuthModal />
        </Suspense>
      </body>
    </html>
  );
}
