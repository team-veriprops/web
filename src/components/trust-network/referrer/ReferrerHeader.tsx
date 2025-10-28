import PageHeader from "@components/ui/PageHeader";
import { ReactNode } from "react";
import { PageDetails } from "types/models";
import ReferrerNavLinksComponent from "./ReferrerNavLinksComponent";

interface ReferrerHeaderProps extends PageDetails {
  children: ReactNode;
}

export default function ReferrerHeader({
  title,
  description,
  children,
}: ReferrerHeaderProps) {
  return (
    <div className="border-b border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex items-center justify-between">
          <PageHeader title={title} description={description} />
          <div className="mt-6 mr-6">
            <div className="absolute top-2 right-6">
              <ReferrerNavLinksComponent />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
