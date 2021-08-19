import { BaseStrategy } from '../base-strategy';
import {
  PrepaidCardPaymentTransactionType,
  TransactionTypes,
} from '@cardstack/types';
import { convertSpendForBalanceDisplay } from '@cardstack/utils';

export class PrepaidCardPaymentStrategy extends BaseStrategy {
  handlesTransaction(): boolean {
    const { prepaidCardPayments } = this.transaction;

    return Boolean(
      prepaidCardPayments?.[0] &&
        this.prepaidCardAddresses.includes(
          prepaidCardPayments[0].prepaidCard.id
        )
    );
  }

  async mapTransaction(): Promise<PrepaidCardPaymentTransactionType | null> {
    const prepaidCardPaymentTransaction = this.transaction
      .prepaidCardPayments?.[0];

    if (!prepaidCardPaymentTransaction) {
      return null;
    }

    const spendDisplay = convertSpendForBalanceDisplay(
      prepaidCardPaymentTransaction.spendAmount,
      this.nativeCurrency,
      this.currencyConversionRates,
      true
    );

    return {
      address: prepaidCardPaymentTransaction.prepaidCard.id,
      timestamp: prepaidCardPaymentTransaction.timestamp,
      spendAmount: prepaidCardPaymentTransaction.spendAmount,
      type: TransactionTypes.PREPAID_CARD_PAYMENT,
      spendBalanceDisplay: spendDisplay.tokenBalanceDisplay,
      nativeBalanceDisplay: spendDisplay.nativeBalanceDisplay,
      transactionHash: this.transaction.id,
    };
  }
}
