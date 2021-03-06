import {
  convertRawAmountToBalance,
  convertRawAmountToNativeDisplay,
} from '@cardstack/cardpay-sdk';
import React from 'react';
import { ContactAvatar } from '../../../../src/components/contacts';
import { TransactionConfirmationSectionHeaderText } from './TransactionConfirmationSectionHeaderText';
import {
  Container,
  HorizontalDivider,
  Icon,
  NetworkBadge,
  Text,
  TransactionConfirmationDisplayProps,
} from '@cardstack/components';
import { WithdrawalDecodedData } from '@cardstack/types';
import { useAccountProfile } from '@rainbow-me/hooks';
import { useNativeCurrencyAndConversionRates } from '@rainbow-me/redux/hooks';

interface WithdrawalDisplayProps extends TransactionConfirmationDisplayProps {
  data: WithdrawalDecodedData;
}

export const WithdrawalDisplay = (props: WithdrawalDisplayProps) => {
  const { data } = props;

  return (
    <>
      <FromSection data={data} />
      <HorizontalDivider />
      <WithdrawSection data={data} />
      <HorizontalDivider />
      <ToSection data={data} />
    </>
  );
};

const FromSection = ({ data }: { data: WithdrawalDecodedData }) => {
  const { accountColor, accountName, accountSymbol } = useAccountProfile();
  const typeText = data.addressType === 'depot' ? 'DEPOT' : 'MERCHANT';
  const tokenDisplay = convertRawAmountToBalance(data.tokenBalance, data.token);

  return (
    <Container marginTop={8} width="100%">
      <TransactionConfirmationSectionHeaderText>
        FROM
      </TransactionConfirmationSectionHeaderText>
      <Container paddingHorizontal={3} marginTop={4}>
        <Container flexDirection="row">
          <ContactAvatar
            color={accountColor}
            size="smaller"
            value={accountSymbol}
          />
          <Container marginLeft={4}>
            <Text weight="extraBold">{accountName}</Text>
            <NetworkBadge marginTop={2} />
            <Container flexDirection="row" marginTop={2}>
              <Container backgroundColor="black" width={2} height="100%" />
              <Container marginLeft={4}>
                <Text size="xxs" weight="bold">
                  {typeText}
                </Text>
                <Container maxWidth={180} marginTop={1}>
                  <Text variant="subAddress">{data.address}</Text>
                </Container>
                <Text weight="extraBold">{tokenDisplay.display}</Text>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

const WithdrawSection = ({ data }: { data: WithdrawalDecodedData }) => {
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
        WITHDRAW THIS AMOUNT
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

const ToSection = ({ data }: { data: WithdrawalDecodedData }) => {
  return (
    <Container width="100%">
      <TransactionConfirmationSectionHeaderText>
        TO
      </TransactionConfirmationSectionHeaderText>
      <Container paddingHorizontal={3} marginTop={4}>
        <NetworkBadge marginLeft={11} marginBottom={1} text="TO MAINNET" />
        <Container flexDirection="row">
          <Icon name="user" />
          <Container marginLeft={4}>
            <Container maxWidth={180}>
              <Text variant="subAddress">{data.layer1Recipient}</Text>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
