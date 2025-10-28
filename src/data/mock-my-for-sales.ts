import {
  PropertyStatus,
  QueryForSaleDto,
} from "@components/portal/my-for-sale/models";
import {
  Money,
  PropertyType,
  TransactionCurrency,
} from "@components/website/property/models";
import { faker } from "@faker-js/faker";

export async function generateMyForSale(): Promise<QueryForSaleDto> {
  return {
    id: faker.string.uuid(),
    title: faker.company.buzzPhrase(),
    location: faker.location.streetAddress(),
    price: Money.from({
      value: faker.number.int({ min: 500000, max: 50000000 }),
      currency: TransactionCurrency.NGN,
    }),
    type: faker.helpers.arrayElement([
      PropertyType.HOUSE,
      PropertyType.LAND,
      PropertyType.SERVICE,
    ]),
    status: faker.helpers.arrayElement([
      PropertyStatus.PENDING,
      PropertyStatus.ACTIVE,
      PropertyStatus.HIDDEN,
      PropertyStatus.SOLD,
    ]),
    views: faker.number.int({ min: 50, max: 50000 }),
    inquiries: faker.number.int({ min: 5, max: 500 }),
    date_created: faker.date.past().toISOString(),
  };
}

export async function generateMyForSaleDetail(id: string): Promise<any> {
  return {
    id: faker.string.uuid(),
    for_sale_id: id,
    date_created: faker.date.past().toISOString(),
  };
}

export let for_sales: QueryForSaleDto[] = [];
export let for_sale_details: any[] = [];

async function initData() {
  if (for_sales.length === 0) {
    for_sales = await Promise.all(
      Array.from({ length: 30 }, () => generateMyForSale())
    );
  }

  if (for_sale_details.length === 0) {
    for (const for_sale of for_sales) {
      const for_sale_detail = await generateMyForSaleDetail(for_sale.id!);
      for_sale_details.push(for_sale_detail);
    }
  }
}

// Kick off immediately
initData();
