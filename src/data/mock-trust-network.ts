import { faker } from "@faker-js/faker";
import { getActiveAuditor, users } from "./mock-users";
import { QueryTrustNetworkDto } from "@components/trust-network/models";
import {
  MeasurementUnit,
  Money,
  TransactionCurrency,
} from "@components/website/property/models";
import { QueryActivityEventDto } from "@components/trust-network/ui/recent-activities/models";
import { QueryReferralUserDto } from "@components/trust-network/referrer/referrals/models";
import {
  QueryReferrerTrustAwardDto,
  referrerStructure,
  ReferrerTrustAwardCategoryKey,
  ReferrerTrustTier,
  regions,
} from "@components/trust-network/referrer/leaderboard/models";
import {
  QueryVerifierTaskDto,
  VerifierRole,
  VerifierTaskAvailabilityStatus,
  VerifierTaskStatus,
} from "@components/trust-network/verifier/models";
import { getRandomStateCity } from "./mock-properties";

const rtps_tiers_id = [
  ReferrerTrustTier.TRUST_BUILDER,
  ReferrerTrustTier.VERIFIED_CONNECTOR,
  ReferrerTrustTier.TRUSTED_PARTNER,
  ReferrerTrustTier.VERIPROPS_AMBASSADOR,
  ReferrerTrustTier.COMMUNITY_LEADER,
  ReferrerTrustTier.LEGACY_PARTNER,
];

export async function generateTrustNetwork(
  userId: string
): Promise<QueryTrustNetworkDto> {
  const next_r_tier_key = faker.helpers.arrayElement(rtps_tiers_id);
  const next_r_tier_name = referrerStructure.tiers
    .filter((tier) => tier.key === next_r_tier_key)
    .map((tier) => tier.name)[0];
  return {
    id: faker.string.uuid(),
    user_id: userId,
    current_r_tier_key: faker.helpers.arrayElement(rtps_tiers_id),
    current_r_tps: faker.number.int({ min: 10, max: 100 }),
    next_r_tier_name: next_r_tier_name,
    next_r_tier_min_tps: faker.number.int({ min: 10, max: 100 }),
    next_r_tier_progress_percent: faker.number.int({ min: 10, max: 100 }),
    next_r_tier_required_referrals: faker.number.int({ min: 3, max: 10 }),
    current_v_tier_key: faker.helpers.arrayElement(rtps_tiers_id),
    current_v_tps: faker.number.int({ min: 10, max: 100 }),
    next_v_tier_name: next_r_tier_name,
    next_v_tier_min_tps: faker.number.int({ min: 10, max: 100 }),
    next_v_tier_progress_percent: faker.number.int({ min: 10, max: 100 }),
    next_v_tier_required_verifications: faker.number.int({ min: 10, max: 30 }),
  };
}

export async function generateReferralUser(
  avatar: string,
  referralCode?: string,
  directReferrerId?: string,
  indirectReferrerId?: string
): Promise<QueryReferralUserDto> {
  const first_name = faker.person.firstName();
  const last_name = faker.person.lastName();

  const tier_key = faker.helpers.arrayElement(rtps_tiers_id);
  const tier_name = referrerStructure.tiers
    .filter((tier) => tier.key === tier_key)
    .map((tier) => tier.name)[0];

  return {
    id: faker.string.uuid(),
    referral_code: referralCode || faker.string.uuid(),
    fullname: `${first_name} ${last_name}`,
    email: faker.internet.email(),
    avatar: avatar,
    direct_referral_count: faker.number.int({ min: 0, max: 90 }),
    tier_key: tier_key,
    tier_name: tier_name,
    trust_score: faker.number.int({ min: 10, max: 100 }),
    direct_referrer_code: directReferrerId,
    indirect_referrer_code: indirectReferrerId,
    is_active: faker.helpers.arrayElement([true, false]),
    date_created: faker.date.past().toISOString(),
    contribution_to_direct_referrer: {
      amount: Money.from({
        value: faker.number.int({ min: 500000, max: 50000000 }),
        currency: TransactionCurrency.NGN,
      }),
      sales: faker.number.int({ min: 0, max: 100 }),
      buys: faker.number.int({ min: 0, max: 70 }),
    },
  };
}

const referrerTrustAwardCategories = [
  ReferrerTrustAwardCategoryKey.TOP_TRUST,
  ReferrerTrustAwardCategoryKey.TOP_REFERRERS,
  ReferrerTrustAwardCategoryKey.TOP_EARNERS,
  ReferrerTrustAwardCategoryKey.MOST_IMPROVED,
  ReferrerTrustAwardCategoryKey.MOST_DISPUTE_FREE,
  ReferrerTrustAwardCategoryKey.HALL_OF_INTEGRITY,
];
export async function generateReferrerTrustAward(
  avatar: string,
  userId?: string,
  userCategory?: ReferrerTrustAwardCategoryKey
): Promise<QueryReferrerTrustAwardDto> {
  const category = faker.helpers.arrayElement(referrerTrustAwardCategories);

  const first_name = faker.person.firstName();
  const last_name = faker.person.lastName();
  const tier_key = faker.helpers.arrayElement(rtps_tiers_id);
  const tier_name = referrerStructure.tiers
    .filter((tier) => tier.key === tier_key)
    .map((tier) => tier.name)[0];
  return {
    id: faker.string.uuid(),
    user_id: userId || faker.string.uuid(),
    category: userCategory || category,
    fullname: `${first_name} ${last_name}`,
    avatar: avatar,
    tier_name: tier_name,
    tier_key: tier_key,
    trust_score: faker.number.int({ min: 10, max: 100 }),
    added_trust_score: faker.number.int({ min: 0, max: 20 }),
    direct_referral_count: faker.number.int({ min: 0, max: 90 }),
    indirect_referral_count: faker.number.int({ min: 0, max: 90 }),
    amount_earned: Money.from({
      value: faker.number.int({ min: 500000, max: 50000000 }),
      currency: TransactionCurrency.NGN,
    }),
    direct_referrer_sales_count: faker.number.int({ min: 0, max: 90 }),
    direct_referrer_buys_count: faker.number.int({ min: 0, max: 90 }),
    region: faker.helpers.arrayElement(regions).key,
    date_last_active: faker.date.past().toISOString(),
    date_tps_updated: faker.date.past().toISOString(),
    disputes_count: faker.number.int({ min: 0, max: 9 }),
    has_integrity_badge:
      category === ReferrerTrustAwardCategoryKey.HALL_OF_INTEGRITY &&
      faker.helpers.arrayElement([true, false]),
    rank: faker.number.int({ min: 0, max: 90 }),
  };
}

export async function generateActivityEvent(
  userId: string
): Promise<QueryActivityEventDto> {
  return {
    id: faker.string.uuid(),
    user_id: userId,
    type: faker.helpers.arrayElement([
      "referral",
      "transaction",
      "tier",
      "dispute",
      "system",
    ]),
    title: faker.person.jobTitle(),
    description: faker.lorem.sentence(),
    amount: Money.from({
      value: faker.number.int({ min: 500000, max: 50000000 }),
      currency: TransactionCurrency.NGN,
    }),
    date_created: faker.date.past().toISOString(),
    related_id: faker.string.uuid(),
  };
}

export async function generateVerifierTask(
  verifier_id: string
): Promise<QueryVerifierTaskDto> {
  const { state, grouping_city, city } = getRandomStateCity();
  return {
    id: faker.string.uuid(),
    property_parcel_id: `PARC-${faker.number.int({ min: 200, max: 1000 })}`,
    property_id: faker.string.uuid(),
    property_title: faker.company.buzzPhrase(),
    plot_size: {
      value: faker.number.int({ min: 200, max: 1000 }),
      unit: MeasurementUnit.SQM,
    },
    location: {
      address: faker.location.streetAddress(),
      country: "Nigeria",
      state,
      grouping_city,
      city,
      area: faker.word.noun(),
      coordinates: {
        lat: Number(faker.location.latitude()),
        lng: Number(faker.location.longitude()),
      },
    },

    verifier_id: verifier_id || faker.string.uuid(),
    role_required: faker.helpers.arrayElement([
      VerifierRole.FIELD_AGENT,
      VerifierRole.LAWYER,
      VerifierRole.REGISTRY,
      VerifierRole.SURVEYOR,
    ]),
    verification_focus: faker.helpers.arrayElements([
      "Title chain check",
      "Encumbrance search",
      "Land use compliance",
      "Deed verification",
      "Registry compliance",
      "Ownership history",
      "Legal disputes check",
      "Deed of assignment",
      "Power of attorney check",

      "Boundary verification",
      "Coordinate match to plan",
      "Land measurement",
      "GPS coordinates",
      "Boundary markers",
      "Area calculation",
      "Boundary walk",
      "Perimeter measurement",
      "Encroachment check",
      "Setback verification",

      "Physical inspection",
      "Structure verification",
      "Building condition",
      "Access road check",
      "Occupancy status",
      "Infrastructure check",
      "Perimeter fence",
      "Gate security",
      "Neighborhood assessment",
      "Environmental check",

      "Registry extract verification",
      "Official records",
      "Title registration status",
      "Stamp verification",
      "Official seal verification",
      "Records match",
      "Land use classification",
      "Registry compliance",
    ]),
    required_response: faker.helpers.arrayElements([
      "title_document",
      "legal_opinion",

      "gps_trace",
      "survey_plan",
      "boundary_photos",

      "photos",
      "video",
      "witness_form",

      "registry_extract",
    ]),
    provided_response: [],
    status: faker.helpers.arrayElement([
      VerifierTaskStatus.ACCEPTED,
      VerifierTaskStatus.ASSIGNED,
      VerifierTaskStatus.COMPLETED,
      VerifierTaskStatus.DECLINED,
      VerifierTaskStatus.IN_PROGRESS,
      VerifierTaskStatus.OVERDUE,
      VerifierTaskStatus.SUBMITTED,
    ]),
    availability_status: faker.helpers.arrayElement([
      VerifierTaskAvailabilityStatus.ACCEPTED,
      VerifierTaskAvailabilityStatus.DECLINED,
      VerifierTaskAvailabilityStatus.PENDING,
    ]),
    date_assigned: faker.date.past().toISOString(),
    date_due: faker.date.past().toISOString(),
    // sla_progress: number;
    // sla_hours: number;
    // progress?: number;
    notes: faker.helpers.arrayElements(
      await Promise.all(Array.from({ length: 4 }, () => faker.lorem.sentence()))
    ),
    qualified_verifier_ids: faker.helpers.arrayElements(
      await Promise.all(Array.from({ length: 4 }, () => faker.string.uuid()))
    ),
    date_created: faker.date.past().toISOString(),
  };
}

export let trustNetworks: QueryTrustNetworkDto[] = [];
export let activities: QueryActivityEventDto[] = [];
export let referrals: QueryReferralUserDto[] = [];
export let referrerLeaderBoard: QueryReferrerTrustAwardDto[] = [];
export let verifierTasks: QueryVerifierTaskDto[] = [];

async function initData() {
  // only generate once
  const activeAuditor = await getActiveAuditor();

  if (trustNetworks.length === 0) {
    for (const user of users) {
      const thisTrustNetworks = await generateTrustNetwork(user.id!);

      trustNetworks.push(thisTrustNetworks);

      // Create Activities
      const thisUserActivities = await Promise.all(
        Array.from({ length: 30 }, () => generateActivityEvent(user.id!))
      );
      activities.push(...thisUserActivities);
    }

    const thisTrustNetworks = await generateTrustNetwork(activeAuditor.id!);
    trustNetworks.push(thisTrustNetworks);

    // Create Referral Users
    const thisReferrals = await generateReferralUser(
      activeAuditor.avatar!,
      activeAuditor.referral_code
    );
    referrals.push(thisReferrals);
    const referral = referrals[0];

    // Direct Referrals
    let directReferrals: QueryReferralUserDto[] = [];
    directReferrals = await Promise.all(
      Array.from({ length: 3 }, () =>
        generateReferralUser(
          activeAuditor.avatar!,
          undefined,
          referral.referral_code
        )
      )
    );

    referrals.push(...directReferrals);
    // Indirect Referrals
    let indirectReferrals: QueryReferralUserDto[] = [];
    for (const directReferral of directReferrals) {
      indirectReferrals = await Promise.all(
        Array.from({ length: 10 }, () =>
          generateReferralUser(
            activeAuditor.avatar!,
            undefined,
            directReferral.referral_code,
            referral.referral_code
          )
        )
      );

      referrals.push(...indirectReferrals);
    }

    // LeaderBoard
    const thisReferrerLeaderBoard = await Promise.all(
      Array.from({ length: 80 }, () =>
        generateReferrerTrustAward(activeAuditor.avatar!, undefined)
      )
    );

    referrerLeaderBoard.push(...thisReferrerLeaderBoard);

    // ACtive Auditor in Leader Board
    for (const referrerTrustAwardCategory of referrerTrustAwardCategories) {
      const thisReferrerLeaderBoard = await generateReferrerTrustAward(
        activeAuditor.avatar!,
        activeAuditor.id,
        referrerTrustAwardCategory
      );

      referrerLeaderBoard.push(thisReferrerLeaderBoard);
    }

    // Verifier Tasks
    let thisVerifierTasks = await Promise.all(
      Array.from({ length: 30 }, () =>
        generateVerifierTask(activeAuditor.verifier_id!)
      )
    );

    verifierTasks.push(...thisVerifierTasks);
  }
}

// Kick off immediately
initData();
