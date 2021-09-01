import { Resolver } from 'did-resolver';
import { getResolver } from '@cardstack/did-resolver';
import { MerchantRevenueEventFragment } from '@cardstack/graphql';
import { MerchantInformation } from '@cardstack/types';

export const merchantRevenueEventsToTransactions = (
  revenueEvents: MerchantRevenueEventFragment[]
) => {
  return revenueEvents.map((transaction: any) => {
    const updatedTransaction = {
      ...transaction,
      prepaidCardPayments: [transaction?.prepaidCardPayment],
      merchantClaims: [transaction?.merchantClaim],
    };

    delete updatedTransaction.prepaidCardPayment;
    delete updatedTransaction.merchantClaim;

    return updatedTransaction;
  });
};

export const fetchMerchantInfoFromDID = async (
  merchantInfoDID?: string
): Promise<MerchantInformation | undefined> => {
  if (!merchantInfoDID) {
    throw new Error('merchantInfoDID must be present!');
  }

  const didResolver = new Resolver(getResolver());
  const did = await didResolver.resolve(merchantInfoDID);
  const alsoKnownAs = did?.didDocument?.alsoKnownAs?.[0];

  if (!alsoKnownAs) {
    throw new Error('alsoKnownAs is not defined');
  }

  const {
    data: { attributes },
  } = await (await fetch(alsoKnownAs)).json();

  if (attributes) {
    const { name, slug, color } = attributes;

    return {
      name,
      slug,
      color,
      did: attributes.did,
      textColor: attributes['text-color'],
      ownerAddress: attributes['owner-address'],
    };
  }
};

// ToDo: Add test once merchant flow finished
export const generateMerchantPaymentUrl = (
  merchantSafeID: string,
  amount: number,
  network = 'sokol',
  currency = 'SPD'
) => {
  // https://wallet.cardstack.com/pay/[sokol|xdai]/[merchant-safe-id]?amount=[amount-in-specified-currency]&currency=[3-letter-symbol]
  return `https://wallet.cardstack.com/pay/${network}/${merchantSafeID}?amount=${amount}&currency=${currency}`;
};
