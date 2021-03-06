import {
  convertRawAmountToBalance,
  convertRawAmountToNativeDisplay,
  getAddressByNetwork,
} from '@cardstack/cardpay-sdk';
import React from 'react';
import { TransactionConfirmationSectionHeaderText } from './TransactionConfirmationSectionHeaderText';
import { TransactionConfirmationDisplayProps } from './TransactionConfirmationSheet';
import {
  Container,
  HorizontalDivider,
  Icon,
  NetworkBadge,
  Text,
} from '@cardstack/components';
import { ClaimRevenueDecodedData } from '@cardstack/types';
import {
  useNativeCurrencyAndConversionRates,
  useRainbowSelector,
} from '@rainbow-me/redux/hooks';

interface ClaimRevenueDisplayProps extends TransactionConfirmationDisplayProps {
  data: ClaimRevenueDecodedData;
}

export const ClaimRevenueDisplay = (props: ClaimRevenueDisplayProps) => {
  return (
    <>
      <FromSection />
      <HorizontalDivider />
      <ClaimSection data={props.data} />
      <HorizontalDivider />
      <ToSection merchantSafe={props.data.merchantSafe} />
    </>
  );
};

const FromSection = () => {
  const network = useRainbowSelector(state => state.settings.network);
  const revenuePool = getAddressByNetwork('revenuePool', network);

  return (
    <Container marginTop={8} width="100%">
      <TransactionConfirmationSectionHeaderText>
        FROM
      </TransactionConfirmationSectionHeaderText>
      <Container paddingHorizontal={3} marginTop={4} flexDirection="row">
        <Icon name="cardstack" />
        <Container marginLeft={3}>
          <Text weight="extraBold">CARD Protocol Revenue Pool</Text>
          <NetworkBadge marginTop={2} />
          <Container maxWidth={180} marginTop={2}>
            <Text variant="subAddress">{revenuePool}</Text>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

const ClaimSection = ({ data }: { data: ClaimRevenueDecodedData }) => {
  const [nativeCurrency] = useNativeCurrencyAndConversionRates();

  const tokenDisplay = convertRawAmountToBalance(data.amount, data.token);

  const nativeDisplay = convertRawAmountToNativeDisplay(
    data.amount,
    data.token.decimals,
    data.price,
    nativeCurrency
  );

  return (
    <Container>
      <TransactionConfirmationSectionHeaderText>
        LOAD THIS AMOUNT
      </TransactionConfirmationSectionHeaderText>
      <Container marginLeft={12} marginTop={2}>
        <Text size="large" weight="extraBold">
          {tokenDisplay.display}
        </Text>
        <Text variant="subText">{nativeDisplay.display}</Text>
      </Container>
    </Container>
  );
};

const ToSection = ({ merchantSafe }: { merchantSafe: string }) => {
  return (
    <Container>
      <TransactionConfirmationSectionHeaderText>
        TO
      </TransactionConfirmationSectionHeaderText>
      <Container paddingHorizontal={3} marginTop={4} flexDirection="column">
        <Text size="xxs" color="blueText" marginLeft={9}>
          MERCHANT SAFE
        </Text>
        <Container flexDirection="row" alignItems="center">
          <Icon name="user" />
          <Text size="small" weight="extraBold" style={{ marginLeft: 6 }}>
            Merchant Name
          </Text>
        </Container>
        <Container maxWidth={180} marginLeft={9}>
          <Text variant="subAddress">{merchantSafe}</Text>
        </Container>
      </Container>
    </Container>
  );
};
