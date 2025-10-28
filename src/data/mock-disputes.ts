import {
  DisputeResolutionAction,
  DisputeStatus,
  DisputeType,
  QueryDisputeConversationDto,
  QueryDisputeDto,
  QueryDisputeResolutionTimelineDto,
} from "@components/trust-network/disputes/models";
import { faker } from "@faker-js/faker";
import { getActiveAuditor } from "./mock-users";
import { UserType } from "@components/user/models";

export async function generateDispute(
  userId: string
): Promise<QueryDisputeDto> {
  return {
    id: faker.string.uuid(),
    ref_id: `DISP-${faker.number.int({ min: 1, max: 1000 })}`,
    description: faker.lorem.sentence(),
    type: faker.helpers.arrayElement([
      DisputeType.EARNING,
      DisputeType.OTHER,
      DisputeType.PAYMENT,
      DisputeType.PROPERTY,
      DisputeType.REFERRAL,
    ]),
    sub_type: "sub_type",
    related_tran_id: "related_tran_id",
    status: faker.helpers.arrayElement([
      DisputeStatus.DISMISSED,
      DisputeStatus.ESCALATED,
      DisputeStatus.OPEN,
      DisputeStatus.RESOLVED,
      DisputeStatus.UNDER_REVIEW,
    ]),
    raised_by: userId,
    conversion_count: faker.number.int({ min: 1, max: 1000 }),
    sla: {
      expected_response_hours: faker.number.int({ min: 12, max: 48 }),
      escalate_after_hours: faker.number.int({ min: 48, max: 72 }),
    },
    date_created: faker.date.past().toISOString(),
  };
}

export async function generateDisputeConversation(
  userId: string,
  disputeId: string,
  readByUserId?: string
): Promise<QueryDisputeConversationDto> {
  const first_name = faker.person.firstName();
  const last_name = faker.person.lastName();
  return {
    id: faker.string.uuid(),
    dispute_id: disputeId,
    sender_fullname: `${first_name} ${last_name}`,
    sender_user_id: userId,
    sender_user_type: faker.helpers.arrayElement([UserType.ADMIN, UserType.USER, UserType.SYSTEM]),
    text: faker.lorem.sentence(),
    read_by: [readByUserId!],
    attachments: [],
    typing: faker.helpers.arrayElement([true, false]),
    date_created: faker.date.past().toISOString(),
  };
}

export async function generateDisputeResolutionTimeline(
  disputeId: string
): Promise<QueryDisputeResolutionTimelineDto> {
  return {
    id: faker.string.uuid(),
    dispute_id: disputeId,
    action: faker.helpers.arrayElement([
      DisputeResolutionAction.ADMIN_BEGINS_INVESTIGATION,
      DisputeResolutionAction.AUTO_ESCALATED,
      DisputeResolutionAction.CALC_ERROR_CONFIRMED,
      DisputeResolutionAction.CREATE,
      DisputeResolutionAction.DISMISSED,
      DisputeResolutionAction.MANUAL_ESCALATED,
      DisputeResolutionAction.RESOLVED,
    ]),
    notes: faker.lorem.sentence(),
    date_created: faker.date.past().toISOString(),
  };
}

export let disputes: QueryDisputeDto[] = [];
export let disputeConversations: QueryDisputeConversationDto[] = [];
export let disputeResolutionTimelines: QueryDisputeResolutionTimelineDto[] = [];

// Kick off immediately
initData();

async function initData() {
  const activeAuditor = await getActiveAuditor();
  // only generate once
  if (disputes.length === 0) {
    const thisDisputes = await Promise.all(
      Array.from({ length: 5 }, () => generateDispute(activeAuditor.id!))
    );
    disputes.push(...thisDisputes);

    for (const dispute of disputes) {
      // Resolution Timeline
      const thisDisputeResolutionTimelines = await Promise.all(
        Array.from({ length: 5 }, () =>
          generateDisputeResolutionTimeline(dispute.id!)
        )
      );
      disputeResolutionTimelines.push(...thisDisputeResolutionTimelines);
      // Conversation
      const thisDisputeConversations = await Promise.all(
        Array.from({ length: 5 }, () =>
          generateDisputeConversation(dispute.raised_by, dispute.id!)
        )
      );
      disputeConversations.push(...thisDisputeConversations);

      dispute.conversion_count = disputeConversations.length ?? 0
    }
  }
}
