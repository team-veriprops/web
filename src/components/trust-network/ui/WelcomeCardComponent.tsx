import { Card } from "@components/3rdparty/ui/card";
import { TierId } from "../referrer/models";
import { Badge } from "@components/3rdparty/ui/badge";
import { ProgressRuler } from "./ProgressRuler";

interface WelcomeCardComponentProps {
  firstName: string;
  tierId: TierId;
  currentTPS: number;
  progressPercent: number;
  requiredReferrals: number;
  nextTierName?: string;
  nextTierMinTPS?: number;
}

export default function WelcomeCardComponent({
  firstName,
  tierId,
  currentTPS,
  progressPercent,
  requiredReferrals,
  nextTierName,
  nextTierMinTPS
}: WelcomeCardComponentProps) {

  const tierColors: Record<TierId, string> = {
    trust_builder: "bg-slate-500",
    verified_connector: "bg-blue-500",
    trusted_partner: "bg-teal-500",
    veriprops_ambassador: "bg-purple-500",
    community_leader: "bg-amber-500",
    legacy_partner: "bg-rose-500"
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Welcome back, {firstName}!
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {"Here's your trust network overview"}
          </p>
        </div>
        <Badge className={`${tierColors[tierId]} text-white border-0`}>
          {nextTierName || "Trust Builder"}
        </Badge>
      </div>

      {nextTierName && nextTierMinTPS && (
        <ProgressRuler
          currentTPS={currentTPS}
          nextTierName={nextTierName}
          nextTierMinTPS={nextTierMinTPS}
          progressPercent={progressPercent}
          requiredReferrals={requiredReferrals}
        />
      )}
    </Card>
  );
};
