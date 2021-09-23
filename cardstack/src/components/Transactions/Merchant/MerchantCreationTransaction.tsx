import React from 'react';
import {
  TransactionBase,
  TransactionBaseCustomizationProps,
} from '../TransactionBase';
import { Icon, SafeHeader } from '@cardstack/components';
import { MerchantCreationTransactionType } from '@cardstack/types';
import { useMerchantInfoFromDID } from '@cardstack/hooks/merchant/useMerchantInfoFromDID';

interface MerchantCreationTransactionProps
  extends TransactionBaseCustomizationProps {
  item: MerchantCreationTransactionType;
}

export const MerchantCreationTransaction = ({
  item,
  ...props
}: MerchantCreationTransactionProps) => {
  const { merchantInfoDID } = useMerchantInfoFromDID(item.infoDid);

  return (
    <TransactionBase
      {...props}
      CoinIcon={<Icon name="user" />}
      Header={
        <SafeHeader
          address={item.address}
          rightText={merchantInfoDID?.name || 'Merchant'}
          small
        />
      }
      statusIconName="plus"
      statusText="Created"
      primaryText={merchantInfoDID?.name || 'Merchant'}
      subText="Merchant Account"
      transactionHash={item.transactionHash}
    />
  );
};