import { getRandomImages } from "@app/api/unsplash/random/lib/unsplash-util";
import { QueryMessageDto } from "@components/portal/conversations/messages/models";
import { QueryConversationDto } from "@components/portal/conversations/models";
import { PropertyType } from "@components/website/property/models";
import { faker } from "@faker-js/faker";

const participants = [
  faker.person.fullName(),
  faker.person.fullName(),
  faker.person.fullName(),
  faker.person.fullName(),
  faker.person.fullName(),
  faker.person.fullName(),
];
// ---------------- Conversation ----------------

// Start empty, mutable array
// export let conversations: QueryConversationDto[] = [];

export async function generateConversation(): Promise<QueryConversationDto> {
  const conversation_participants = faker.helpers.arrayElements(participants, { min: 2, max: 5 })
  conversation_participants.push("YOU")
  return {
    id: faker.string.uuid(),
    title: faker.company.catchPhrase(),
    participants: conversation_participants,
    last_message: faker.company.buzzPhrase(),
    last_message_time: faker.date.past().toISOString(),
    unread_count: faker.number.int({ min: 0, max: 20 }),
    type: faker.helpers.arrayElement([
      PropertyType.HOUSE,
      PropertyType.LAND,
      PropertyType.SERVICE,
    ]),
    date_created: faker.date.past().toISOString(),
  };
}


export async function generateMessage(
  conversation_id: string
): Promise<QueryMessageDto> {
  return {
    id: faker.string.uuid(),
    conversation_id: conversation_id,
    content: faker.helpers.arrayElement([
      faker.lorem.sentence(),
      faker.lorem.sentences(),
    ]),
    sender: faker.helpers.arrayElement(participants),
    sender_type: faker.helpers.arrayElement(["BUYER", "SELLER", "ADMIN"]),
    date_created: faker.date.past().toISOString(),
    avatar: (await getRandomImages({ query: "person", count: 1 }).catch(() => []))?.[0]?.url ?? "/placeholder.jpg",
    // attachments: [{ name: 'Dashboard_Mockups_v2.fig', type: 'figma' }]
  };
}


export let conversations: QueryConversationDto[] = [];
export let messages: QueryMessageDto[] = [];

async function initData() {
  // only generate once
  if (conversations.length === 0) {
    conversations = await Promise.all(
      Array.from({ length: 15 }, () => generateConversation())
    );
  }

  if (messages.length === 0) {
    for (const conversation of conversations) {
      const this_messages = await Promise.all(
        Array.from({ length: 10 }, () => generateMessage(conversation.id!))
      );
      messages.push(...this_messages);
    }
  }
}

// Kick off immediately
initData();
