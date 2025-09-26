import { Metadata } from "next";
import "@app/globals.css";
import { ClarityPageTracker } from "@components/microsoft-clarity/clarity-tracker";
import { ClarityProvider } from "@components/microsoft-clarity/clarity-provider";
import { AuthModal } from "@components/user/auth/AuthModal";
import { Suspense } from "react";
import { ClientWrapperProvider } from "providers/client-wrapper";

export const metadata: Metadata = {
  title: "Verified properties for sale | Veriprops",
  description:
    "Nigeria’s trusted marketplace for verified properties and real estate services - connecting buyers, sellers, and professionals with confidence. In the rare event of a dispute, we stand firmly with our buyers, offering full support, including legal representation.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <ClientWrapperProvider>{children}</ClientWrapperProvider>

        <ClarityProvider />
        <ClarityPageTracker />
        <Suspense fallback={null}>
          <AuthModal />
        </Suspense>
      </body>
    </html>
  );
}
