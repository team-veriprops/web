import { Progress } from "@components/3rdparty/ui/progress";

interface ProgressRulerProps {
  currentTPS: number;
  nextTierName: string;
  nextTierMinTPS: number;
  progressPercent: number;
  requiredReferrals: number;
}

export const ProgressRuler = ({
  currentTPS,
  nextTierName,
  nextTierMinTPS,
  progressPercent,
  requiredReferrals
}: ProgressRulerProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">Progress to {nextTierName}</span>
        <span className="text-muted-foreground">
          {currentTPS} / {nextTierMinTPS} TPS
        </span>
      </div>
      
      <Progress value={progressPercent} className="h-2" />
      
      <p className="text-xs text-muted-foreground">
        You need approximately <span className="font-semibold text-foreground">{requiredReferrals}</span> more verified referrals to reach {nextTierName}
      </p>
    </div>
  );
};
