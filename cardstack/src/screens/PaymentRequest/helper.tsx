import React from 'react';
import { Container, Text } from '@cardstack/components';
import { getAddressPreview, nativeCurrencyToSpend } from '@cardstack/utils';

export const RequestPaymentMerchantInfo = ({
  address,
  name,
}: {
  address: string;
  name: string | undefined;
}) => (
  <Container
    alignItems="center"
    flexDirection="column"
    paddingTop={5}
    width="100%"
  >
    <Text size="body" weight="extraBold">
      Request Payment
    </Text>
    <Text
      color="blueText"
      fontWeight="600"
      marginTop={3}
      size="smallest"
      textTransform="uppercase"
    >
      {name || ''}
    </Text>
    <Text fontFamily="RobotoMono-Regular" size="xs" weight="regular">
      {getAddressPreview(address)}
    </Text>
  </Container>
);

export const SpendAmount = ({
  formattedAmount,
  nativeCurrencyRate,
  textCenter = false,
}: {
  formattedAmount: string | undefined;
  nativeCurrencyRate: number;
  textCenter?: boolean;
}) => (
  <Text
    color="blueText"
    fontFamily="OpenSans-Regular"
    fontSize={12}
    textAlign={textCenter ? 'center' : undefined}
  >
    {
      nativeCurrencyToSpend(formattedAmount, nativeCurrencyRate, true)
        .tokenBalanceDisplay
    }
  </Text>
);
