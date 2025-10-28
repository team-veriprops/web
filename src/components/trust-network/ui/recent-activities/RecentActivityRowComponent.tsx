import { Button } from "@3rdparty/ui/button";
import { DollarSign, Users, Award, AlertTriangle, Settings, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@3rdparty/ui/dropdown-menu";
import { QueryActivityEventDto } from "@components/trust-network/ui/recent-activities/models";
import { formatRelativeTime } from "@lib/time";
import { formatMoney } from "@lib/utils";

interface RecentActivityRowComponentProps {
  activity: QueryActivityEventDto;
  onRaiseDispute: (activity: QueryActivityEventDto) => void;
}

export default function RecentActivityRowComponent({ activity, onRaiseDispute }: RecentActivityRowComponentProps) {
  const getIcon = () => {
    switch (activity.type) {
      case "transaction":
        return <DollarSign className="h-5 w-5 text-success" />;
      case "referral":
        return <Users className="h-5 w-5 text-primary" />;
      case "tier":
        return <Award className="h-5 w-5 text-accent" />;
      case "dispute":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "system":
        return <Settings className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Settings className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
        {activity.description && (
          <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
        )}
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatRelativeTime(activity.date_created)}
        </p>
      </div>

      {activity.amount !== undefined && (
        <div className="text-sm font-semibold text-success">
          {formatMoney(activity.amount)}
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
          onClick={() => onRaiseDispute(activity)}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Raise Dispute
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
