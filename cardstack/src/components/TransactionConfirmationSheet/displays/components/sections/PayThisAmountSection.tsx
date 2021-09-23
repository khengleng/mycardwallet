import React from 'react';
import { SectionHeaderText } from '../SectionHeaderText';
import { convertSpendForBalanceDisplay } from '@cardstack/utils';
import { useNativeCurrencyAndConversionRates } from '@rainbow-me/redux/hooks';
import { Container, Text } from '@cardstack/components';

export const useSpendDisplay = (
  spendAmount: string | number,
  includeSuffix = true
) => {
  const [
    nativeCurrency,
    currencyConversionRates,
  ] = useNativeCurrencyAndConversionRates();

  const spendDisplay = convertSpendForBalanceDisplay(
    String(spendAmount),
    nativeCurrency,
    currencyConversionRates,
    includeSuffix
  );

  return spendDisplay;
};

export const PayThisAmountSection = ({
  headerText,
  spendAmount,
}: {
  headerText: string;
  spendAmount: string | number;
}) => {
  const spendDisplay = useSpendDisplay(spendAmount);

  return (
    <Container>
      <SectionHeaderText>{headerText}</SectionHeaderText>
      <Container marginLeft={12} marginTop={2}>
        <Text size="large" weight="extraBold">
          {spendDisplay.tokenBalanceDisplay}
        </Text>
        <Text variant="subText">{spendDisplay.nativeBalanceDisplay}</Text>
      </Container>
    </Container>
  );
};