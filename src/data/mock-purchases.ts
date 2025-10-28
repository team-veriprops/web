import { getRandomImages } from "@app/api/unsplash/random/lib/unsplash-util";
import {
  EscrowStatus,
  QueryPurchaseDetailDto,
  TransactionStatus,
} from "@components/portal/purchases/details/models";
import {
  PurchaseStatus,
  QueryPurchaseDto,
} from "@components/portal/purchases/models";
import {
  Money,
  PropertyType,
  TransactionCurrency,
} from "@components/website/property/models";
import { faker } from "@faker-js/faker";

export async function generatePurchase(): Promise<QueryPurchaseDto> {
  return {
    id: faker.string.uuid(),
    title: faker.company.catchPhrase(),
    price: Money.from({
      value: faker.number.int({ min: 20000, max: 500000 }),
      currency: TransactionCurrency.NGN,
    }),
    date: faker.date.past().toISOString(),
    status: faker.helpers.arrayElement([
      PurchaseStatus.PENDING,
      PurchaseStatus.COMPLETED,
      PurchaseStatus.CANCELLED,
    ]),
    type: faker.helpers.arrayElement([
      PropertyType.HOUSE,
      PropertyType.LAND,
      PropertyType.SERVICE,
    ]),
    date_created: faker.date.past().toISOString(),
  };
}

export async function generatePurchaseDetail(
  purchase_id: string
): Promise<QueryPurchaseDetailDto> {
  return {
    id: `TXN-${faker.number.int({ min: 1000, max: 500000 })}`,
    purchase_id: purchase_id,
    property: {
      id: `PROP-${faker.number.int({ min: 1000, max: 500000 })}`,
      title: faker.company.catchPhrase(),
      location: faker.location.streetAddress(),
      thumbnail: (await getRandomImages({ query: "house", count: 1 }).catch(() => []))?.[0]?.url ?? "/placeholder.jpg",
    },
    buyer: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    },
    seller: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    },
    amount: {
      total: Money.from({
        value: faker.number.int({ min: 500000, max: 50000000 }),
        currency: TransactionCurrency.NGN,
      }),
      escrow: Money.from({
        value: faker.number.int({ min: 50000, max: 5000000 }),
        currency: TransactionCurrency.NGN,
      }),
      fees: Money.from({
        value: faker.number.int({ min: 5000, max: 500000 }),
        currency: TransactionCurrency.NGN,
      }),
    },
    status: faker.helpers.arrayElement([
      TransactionStatus.INITIATED,
      TransactionStatus.PENDING,
      TransactionStatus.COMPLETED,
      TransactionStatus.CONTRACT_SIGNED,
      TransactionStatus.CANCELLED,
    ]),
    escrow_status: faker.helpers.arrayElement([
      EscrowStatus.AWAITING_FUNDING,
      EscrowStatus.FUNDS_SECURED,
      EscrowStatus.RELEASED,
      EscrowStatus.RELEASED,
    ]),
    escrow_ref: `ESCROW-VP-${faker.number.int({ min: 1000, max: 500000 })}`,
    contract_url: `/contracts/contract-${faker.number.int({ min: 1000, max: 500000 })}.pdf`,
    contract_signed: true,
    date_created: faker.date.past().toISOString(),
    documents: [
      "Building Plan.pdf",
      "Property Title.pdf",
      "Insurance Policy.pdf",
    ],
  };
}

export let purchases: QueryPurchaseDto[] = [];
export let purchaseDetails: QueryPurchaseDetailDto[] = [];

async function initData() {
  // only generate once
  if (purchases.length === 0) {
    purchases = await Promise.all(
      Array.from({ length: 20 }, () => generatePurchase())
    );
  }

  if (purchaseDetails.length === 0) {
    for (const purchase of purchases) {
      const this_details = await generatePurchaseDetail(purchase.id!);

      purchaseDetails.push(this_details);
    }
  }
}

// Kick off immediately
initData();
