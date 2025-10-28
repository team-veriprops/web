import { NextRequest, NextResponse } from "next/server";
import { verifierTasks } from "@data/mock-trust-network";
import { QueryVerifierTaskDto, QueryVerifierTaskStatsDto, VerifierTaskStatus } from "@components/trust-network/verifier/models";

// GET one
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const filteredVerifierTasks = verifierTasks.filter(
    (verifierTask) => verifierTask.verifier_id === id
  );
  const stats: QueryVerifierTaskStatsDto = getVerifierTaskStats(filteredVerifierTasks);

  return stats
    ? NextResponse.json(stats)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

function getVerifierTaskStats(
  verifierTasks: QueryVerifierTaskDto[]
): QueryVerifierTaskStatsDto {
  const stats: QueryVerifierTaskStatsDto = {
    assigned: 0,
    in_progress: 0,
    submitted: 0,
    overdue: 0,
    due_soon: 0,
    avg_resolution__hours: 0,
  };

  if (verifierTasks.length === 0) return stats;

  let totalResolutionHours = 0;
  let completedCount = 0;
  const now = new Date();

  for (const t of verifierTasks) {
    switch (t.status) {
      case VerifierTaskStatus.ASSIGNED:
      case VerifierTaskStatus.ACCEPTED:
        stats.assigned++;
        break;

      case VerifierTaskStatus.IN_PROGRESS:
        stats.in_progress++;
        break;

      case VerifierTaskStatus.SUBMITTED:
        stats.submitted++;
        break;

      case VerifierTaskStatus.OVERDUE:
        stats.overdue++;
        break;

      case VerifierTaskStatus.COMPLETED:
        completedCount++;
        // estimate resolution hours if timestamps exist
        if (t.date_assigned && t.date_due) {
          const assigned = new Date(t.date_assigned).getTime();
          const completed = new Date(t.date_due).getTime();
          const hours = (completed - assigned) / (1000 * 60 * 60);
          if (hours > 0) totalResolutionHours += hours;
        }
        break;

      default:
        break;
    }

    // Count as "due soon" if within 24 hours from now and not completed/overdue
    if (
      t.date_due &&
      t.status !== VerifierTaskStatus.COMPLETED &&
      t.status !== VerifierTaskStatus.OVERDUE
    ) {
      const due = new Date(t.date_due);
      const hoursUntilDue = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
      if (hoursUntilDue > 0 && hoursUntilDue <= 24) {
        stats.due_soon++;
      }
    }

    // Dynamically catch overdue if due date passed but not completed
    if (
      t.date_due &&
      new Date(t.date_due).getTime() < now.getTime() &&
      t.status !== VerifierTaskStatus.COMPLETED
    ) {
      stats.overdue++;
    }
  }

  stats.avg_resolution__hours = completedCount
    ? parseFloat((totalResolutionHours / completedCount).toFixed(2))
    : 0;

  return stats;
}

