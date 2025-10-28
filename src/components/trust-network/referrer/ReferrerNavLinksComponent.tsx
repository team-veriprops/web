import { Button } from "@components/3rdparty/ui/button";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { redirect } from "next/navigation";

export default function ReferrerNavLinksComponent() {
  return (
    <div className="hidden md:flex gap-2">
      <Button size={"sm"} onClick={() => redirect("/trust-network/referrer")}>
        <ArrowDownLeft className="h-4 w-4 mr-2" />
        Dashboard
      </Button>
      <Button
        size={"sm"}
        variant="outline"
        onClick={() => redirect("/trust-network/referrer/referrals")}
      >
        <ArrowUpRight className="h-4 w-4 mr-2" />
        Referrals
      </Button>
      <Button
        size={"sm"}
        variant="outline"
        onClick={() => redirect("/trust-network/referrer/leaderboard")}
      >
        <ArrowUpRight className="h-4 w-4 mr-2" />
        Leaderboard
      </Button>
    </div>
  );
}
