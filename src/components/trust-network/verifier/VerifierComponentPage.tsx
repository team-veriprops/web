"use client";

import PageHeader from "@components/ui/PageHeader";
import { PageDetails } from "types/models";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import { VerifiersOverviewCards } from "./VerifiersOverviewCards";
import { AvailabilityToggle } from "./VerifierAvailabilityToggle";
import { VerifierTaskTable } from "./task/VerifierTaskTable";

export default function VerifierComponentPage({
  title,
  description,
}: PageDetails) {
  const { activeAuditor } = useAuthStore();
  return (
    <>
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex items-center justify-between">
            <PageHeader
              title={`${title}, ${activeAuditor?.first_name}!`}
              description={description}
            />
            <AvailabilityToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <VerifiersOverviewCards />

        <h2 className="text-2xl font-semibold mt-4 mb-4" id="dispute-table">
          Your Tasks
        </h2>

        <VerifierTaskTable />
      </div>
    </>
  );
}
