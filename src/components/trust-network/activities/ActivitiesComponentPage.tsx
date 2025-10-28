"use client";

import PageHeader from "@components/ui/PageHeader";
import { PageDetails } from "types/models";
import RecentActivitiesComponent from "../ui/recent-activities/RecentActivitiesComponent";

export default function ActivitiesComponentPage({
  title,
  description,
}: PageDetails) {
  return (
    <>
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8 relative">
          <PageHeader title={title} description={description} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <RecentActivitiesComponent />
      </div>
    </>
  );
}
