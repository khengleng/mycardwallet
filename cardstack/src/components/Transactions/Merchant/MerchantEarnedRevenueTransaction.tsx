import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/core';
import {
  TransactionBase,
  TransactionBaseCustomizationProps,
  TransactionBaseProps,
} from '../TransactionBase';
import { CoinIcon } from '@cardstack/components';
import { MerchantEarnedRevenueTransactionType } from '@cardstack/types';
import Routes from '@rainbow-me/routes';

export interface MerchantEarnRevenueTransactionProps
  extends TransactionBaseCustomizationProps {
  item: MerchantEarnedRevenueTransactionType;
}

export const MerchantEarnedRevenueTransaction = ({
  item,
  ...props
}: MerchantEarnRevenueTransactionProps) => {
  const { navigate } = useNavigation();

  const onPressTransaction = useCallback(
    (assetProps: TransactionBaseProps) =>
      navigate(Routes.EXPANDED_ASSET_SHEET_DRILL, {
        asset: { ...assetProps },
        type: 'merchantTransaction',
      }),
    [navigate]
  );

  return (
    <TransactionBase
      {...props}
      CoinIcon={
        <CoinIcon address={item.token.address} symbol={item.token.symbol} />
      }
      primaryText={`+ ${item.balance.display}`}
      statusIconName="arrow-down"
      statusText="Earned"
      subText={item.native.display}
      transactionHash={item.transactionHash}
      onPressTransaction={onPressTransaction}
    />
  );
};
