import {
  PaymentChannel,
  QueryTransactionDetailDto,
  WalletImpact,
} from "@components/portal/transactions/details/models";
import {
  QueryTransactionDto,
  TransactionStats,
  TransactionStatus,
  TransactionType,
} from "@components/portal/transactions/models";
import {
  Money,
  TransactionCurrency,
} from "@components/website/property/models";
import { faker } from "@faker-js/faker";

  
export async function generateTransaction(): Promise<QueryTransactionDto> {
  return {
    id: faker.string.uuid(),
    ref_id: `TXN-2025-00${faker.number.int({ min: 1000, max: 9000 })}`,
    type: faker.helpers.arrayElement([
      TransactionType.DEPOSIT,
      TransactionType.ESCROW,
      TransactionType.WITHDRAWAL,
    ]),
    amount: Money.from({
      value: faker.number.int({ min: 20000, max: 500000 }),
      currency: TransactionCurrency.NGN,
    }),
    status: faker.helpers.arrayElement([
      TransactionStatus.PENDING,
      TransactionStatus.COMPLETED,
      TransactionStatus.CANCELLED,
      TransactionStatus.FAILED,
      TransactionStatus.REFUNDED,
    ]),
    date_created: faker.date.past().toISOString(),
  };
}


  const getGatewayResponse = (status: TransactionStatus) => {
    switch(status){
      case TransactionStatus.PENDING: return "Processing"
      case TransactionStatus.COMPLETED: return "Approved"
      case TransactionStatus.CANCELLED: return "Cancelled"
      case TransactionStatus.FAILED: return "Declined"
      case TransactionStatus.REFUNDED: return "Refunded"
    }
  }

export async function generateTransactionDetail(
  ref_id: string,
  status: TransactionStatus
): Promise<QueryTransactionDetailDto> {
  return {
    id: faker.string.uuid(),
    ref_id: ref_id,
    payment_channel: faker.helpers.arrayElement([
      PaymentChannel.FLUTTERWAVE,
      PaymentChannel.PAYSTACK,
    ]),
    gateway_response: getGatewayResponse(status),
    wallet_impact: faker.helpers.arrayElement([WalletImpact.CREDITED, WalletImpact.DEBITED, WalletImpact.NEUTRAL]),
    escrow_fee: Money.from({
      value: faker.number.int({ min: 20000, max: 500000 }),
      currency: TransactionCurrency.NGN,
    }),
    escrow_id: `ESCROW-VP-${faker.number.int({ min: 1000, max: 500000 })}`,
    escrow_estimated_release_time: faker.date.past().toISOString(),
    contract_id: faker.string.uuid(),
    property_slug: faker.string.uuid(),
    property_title: faker.company.catchPhrase(),
    property_location: faker.location.streetAddress(),
    seller: faker.person.fullName(),
    buyer: faker.person.fullName(),
    date_created: faker.date.past().toISOString(),
    // property: {
    //   id: `PROP-${faker.number.int({ min: 1000, max: 500000 })}`,
    //   title: faker.company.catchPhrase(),
    //   location: faker.location.streetAddress(),
    //   thumbnail: (await getRandomImages({ query: "house", count: 10 }))[0].url,
    // },
    // buyer: {
    //   name: faker.person.fullName(),
    //   email: faker.internet.email(),
    //   phone: faker.phone.number(),
    // },
    // amount: {
    //   total: Money.from({
    //     value: faker.number.int({ min: 500000, max: 50000000 }),
    //     currency: TransactionCurrency.NGN,
    //   }),
    //   escrow: Money.from({
    //     value: faker.number.int({ min: 50000, max: 5000000 }),
    //     currency: TransactionCurrency.NGN,
    //   }),
    //   fees: Money.from({
    //     value: faker.number.int({ min: 5000, max: 500000 }),
    //     currency: TransactionCurrency.NGN,
    //   }),
    // },
    // status: faker.helpers.arrayElement([
    //   TransactionStatus.INITIATED,
    //   TransactionStatus.PENDING,
    //   TransactionStatus.COMPLETED,
    //   TransactionStatus.CONTRACT_SIGNED,
    //   TransactionStatus.CANCELLED,
    // ]),
    // escrow_status: faker.helpers.arrayElement([
    //   EscrowStatus.AWAITING_FUNDING,
    //   EscrowStatus.FUNDS_SECURED,
    //   EscrowStatus.RELEASED,
    //   EscrowStatus.RELEASED,
    // ]),
    // escrow_ref: `ESCROW-VP-${faker.number.int({ min: 1000, max: 500000 })}`,
    // contract_url: `/contracts/contract-${faker.number.int({ min: 1000, max: 500000 })}.pdf`,
    // contract_signed: true,
    // date_created: faker.date.past().toISOString(),
    // documents: [
    //   "Building Plan.pdf",
    //   "Property Title.pdf",
    //   "Insurance Policy.pdf",
    // ],
  };
}

function generateMoney(): {escrow: Money, wallet: Money}{
  return {
    escrow:  Money.from({
      value: faker.number.int({ min: 2000000, max: 50000000 }),
      currency: TransactionCurrency.NGN,
    }),
    wallet:  Money.from({
      value: faker.number.int({ min: 2000000, max: 50000000 }),
      currency: TransactionCurrency.NGN,
    }),
  }
}


export async function generateTransactionStats(): Promise<TransactionStats> {
  const totalBalance =  generateMoney()
  const totalInflow =  generateMoney()
  const totalOutflow =  generateMoney()
  return {
    totalBalance: {
      escrow: totalBalance.escrow,
      wallet: totalBalance.wallet,
      total: totalBalance.escrow.plus(totalBalance.wallet)
    },
    totalInflow: {
      escrow: totalInflow.escrow,
      wallet: totalInflow.wallet,
      total: totalInflow.escrow.plus(totalInflow.wallet)
    },
    totalOutflow: {
      escrow: totalOutflow.escrow,
      wallet: totalOutflow.wallet,
      total: totalOutflow.escrow.plus(totalOutflow.wallet)
    },
    walletBalance: totalBalance.wallet
  };
}

export let transactions: QueryTransactionDto[] = [];
export let transactionDetails: QueryTransactionDetailDto[] = [];
export let transactionStats: TransactionStats | null = null

async function initData() {
  // only generate once
  if (transactions.length === 0) {
    transactions = await Promise.all(
      Array.from({ length: 20 }, () => generateTransaction())
    );
  }

  if (transactionDetails.length === 0) {
    for (const transaction of transactions) {
      const this_details = await generateTransactionDetail(transaction.id!, transaction.status);

      transactionDetails.push(this_details);
    }
  }

  if (transactionDetails.length > 0) {
    transactionStats = await generateTransactionStats()
  }
}

// Kick off immediately
initData();
