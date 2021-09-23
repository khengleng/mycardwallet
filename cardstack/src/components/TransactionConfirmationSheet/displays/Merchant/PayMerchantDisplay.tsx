import React from 'react';

import { PrepaidCardTransactionSection } from '../components/sections/PrepaidCardTransactionSection';
import {
  PayThisAmountSection,
  useSpendDisplay,
} from '../components/sections/PayThisAmountSection';
import { TransactionConfirmationDisplayProps } from '../../TransactionConfirmationSheet';
import TransactionListItem from '../components/TransactionListItem';
import MerchantSectionCard from '../components/sections/MerchantSectionCard';
import { PayMerchantDecodedData } from '@cardstack/types';
import { Container, HorizontalDivider, Text } from '@cardstack/components';
import { useMerchantInfoFromDID } from '@cardstack/hooks/merchant/useMerchantInfoFromDID';

interface PayMerchantDisplayProps extends TransactionConfirmationDisplayProps {
  data: PayMerchantDecodedData;
}

export const PayMerchantDisplay = ({
  data: { infoDID = '', spendAmount, prepaidCard = '', merchantSafe },
}: PayMerchantDisplayProps) => {
  const { merchantInfoDID } = useMerchantInfoFromDID(infoDID);

  // Default to spend while we don't have a currency selector
  const spendDisplay = useSpendDisplay(spendAmount, false);

  return (
    <>
      <Container paddingBottom={4} paddingTop={1}>
        <MerchantSectionCard merchantInfoDID={merchantInfoDID}>
          <Container paddingTop={6} paddingBottom={3} alignItems="center">
            <Text fontSize={40} fontWeight="700">
              {spendDisplay.tokenBalanceDisplay}
            </Text>
            <Text fontSize={12} color="blueText">
              {spendDisplay.nativeBalanceDisplay}
            </Text>
          </Container>
        </MerchantSectionCard>
      </Container>
      <PrepaidCardTransactionSection
        headerText="FROM"
        prepaidCardAddress={prepaidCard}
      />
      <PayThisAmountSection
        headerText="PAY THIS AMOUNT"
        spendAmount={spendAmount}
      />
      <HorizontalDivider />
      <TransactionListItem
        headerText="TO:"
        title={merchantInfoDID?.name || 'Merchant'}
        avatarInfo={merchantInfoDID}
        address={merchantSafe}
        hideDivider
      />
    </>
  );
};