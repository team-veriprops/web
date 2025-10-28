import {
  DisputeStatus,
  QueryDisputeDto,
  QueryDisputeStatsDto,
} from "@components/trust-network/disputes/models";
import { disputes } from "@data/mock-disputes";
import { NextRequest, NextResponse } from "next/server";

// GET one
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  const { user_id } = await params;

  const filteredDisputes = disputes.filter(
    (dispute) => dispute.raised_by === user_id
  );
  const stats: QueryDisputeStatsDto = getDisputeStats(filteredDisputes);

  return stats
    ? NextResponse.json(stats)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

function getDisputeStats(
  disputes: QueryDisputeDto[]
): QueryDisputeStatsDto {
  const stats: QueryDisputeStatsDto = {
    open: 0,
    underReview: 0,
    escalated: 0,
    resolved: 0,
    dismissed: 0,
    avg_resolution__hours: 0,
  };

  if (disputes.length === 0) return stats;

  let totalResolutionHours = 0;
  let resolvedCount = 0;

  for (const d of disputes) {
    switch (d.status) {
      case DisputeStatus.OPEN:
        stats.open++;
        break;
      case DisputeStatus.UNDER_REVIEW:
        stats.underReview++;
        break;
      case DisputeStatus.ESCALATED:
        stats.escalated++;
        break;
      case DisputeStatus.DISMISSED:
        stats.dismissed++;
        break;
      case DisputeStatus.RESOLVED:
        stats.resolved++;
        resolvedCount++;

        // If we have timestamps in BaseQueryDto (e.g. created_at, updated_at)
        // we can calculate resolution time
        if (d.date_created && d.date_updated) {
          const created = new Date(d.date_created).getTime();
          const updated = new Date(d.date_updated).getTime();
          const hours = (updated - created) / (1000 * 60 * 60);
          if (hours > 0) totalResolutionHours += hours;
        }
        break;
      default:
        break;
    }
  }

  stats.avg_resolution__hours = resolvedCount
    ? parseFloat((totalResolutionHours / resolvedCount).toFixed(2))
    : 0;

  return stats;
}
