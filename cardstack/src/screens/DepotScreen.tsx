import React, { useState } from 'react';
import { getConstantByNetwork } from '@cardstack/cardpay-sdk';
import { useRoute } from '@react-navigation/native';
import { Linking, ScrollView, StatusBar } from 'react-native';
import isNativeStackAvailable from '../../../src/helpers/isNativeStackAvailable';
import { BackButton } from '../../../src/components/header';
import { DepotType, TokenType } from '@cardstack/types';
import Routes from '@rainbow-me/routes';
import {
  CenteredContainer,
  Container,
  Icon,
  Text,
  TokenBalance,
  Touchable,
} from '@cardstack/components';
import { getAddressPreview } from '@cardstack/utils';
import { useNavigation } from '@rainbow-me/navigation';
import { useRainbowSelector } from '@rainbow-me/redux/hooks';
import { showActionSheetWithOptions } from '@rainbow-me/utils';

interface RouteType {
  params: { depot: DepotType };
  key: string;
  name: string;
}

enum Tabs {
  BALANCES = 'Balances',
  ACTIVITIES = 'Activities',
}

export default function DepotScreen() {
  const { goBack } = useNavigation();
  const network = useRainbowSelector(state => state.settings.network);
  const blockExplorer = getConstantByNetwork('blockExplorer', network);
  const [selectedTab, setSelectedTab] = useState(Tabs.BALANCES);

  const {
    params: { depot },
  } = useRoute<RouteType>();

  const { address, tokens } = depot;

  const onPressInformation = () => {
    showActionSheetWithOptions(
      {
        options: ['View on Blockscout', 'Cancel'],
        cancelButtonIndex: 1,
      },
      (buttonIndex: number) => {
        if (buttonIndex === 0) {
          Linking.openURL(`${blockExplorer}/address/${address}`);
        }
      }
    );
  };

  return (
    <Container top={0} width="100%" backgroundColor="white">
      <StatusBar barStyle="light-content" />
      <Container height="100%" justifyContent="flex-end" paddingBottom={4}>
        <Container paddingTop={14} backgroundColor="black">
          <Container paddingTop={isNativeStackAvailable ? 4 : 1}>
            <CenteredContainer flexDirection="row">
              <Container left={0} position="absolute">
                {/* @ts-ignore it thinks the JS file requires other props */}
                <BackButton
                  color="teal"
                  direction="left"
                  onPress={goBack}
                  testID="goToBalancesFromScanner"
                />
              </Container>
              <Container alignItems="center">
                <Text color="white" weight="bold">
                  Depot
                </Text>
                <Touchable onPress={onPressInformation}>
                  <Container flexDirection="row" alignItems="center">
                    <Text
                      fontFamily="RobotoMono-Regular"
                      color="white"
                      size="xs"
                      marginRight={2}
                    >
                      {getAddressPreview(address)}
                    </Text>
                    <Icon name="info" size={15} />
                  </Container>
                </Touchable>
              </Container>
              <Container right={20} position="absolute">
                <Touchable onPress={onPressInformation}>
                  <Icon name="more-horizontal" color="teal" />
                </Touchable>
              </Container>
            </CenteredContainer>
          </Container>
          <Container
            flexDirection="row"
            style={{ paddingHorizontal: '10%' }}
            justifyContent="space-between"
          >
            <TabHeader
              tab={Tabs.BALANCES}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <TabHeader
              tab={Tabs.ACTIVITIES}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </Container>
        </Container>
        <Container flex={1} width="100%">
          <Container
            flex={1}
            width="100%"
            height="100%"
            backgroundColor="white"
            position="absolute"
            zIndex={selectedTab === Tabs.BALANCES ? 1 : 0}
          >
            <Balances tokens={tokens} />
          </Container>
          <Container
            flex={1}
            width="100%"
            height="100%"
            backgroundColor="white"
            position="absolute"
            zIndex={selectedTab === Tabs.ACTIVITIES ? 1 : 0}
          >
            <Activities />
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

interface TabHeaderProps {
  setSelectedTab: (tab: Tabs) => void;
  selectedTab: Tabs;
  tab: Tabs;
}

const TabHeader = ({ tab, selectedTab, setSelectedTab }: TabHeaderProps) => {
  const isSelected = selectedTab === tab;
  return (
    <Touchable
      alignItems="center"
      justifyContent="center"
      width="40%"
      paddingTop={5}
      onPress={() => setSelectedTab(tab)}
    >
      <Text
        color="white"
        marginBottom={3}
        weight={isSelected ? 'bold' : 'regular'}
      >
        {tab}
      </Text>
      <Container
        backgroundColor={isSelected ? 'white' : 'black'}
        height={4}
        width="100%"
      />
    </Touchable>
  );
};

interface BalancesProps {
  tokens: TokenType[];
}

const Balances = ({ tokens }: BalancesProps) => {
  const { navigate } = useNavigation();

  const onPress = (token: any) => {
    navigate(Routes.EXPANDED_ASSET_SHEET, {
      asset: token,
      type: 'token',
    });
  };

  return (
    <ScrollView>
      <Container
        paddingHorizontal={5}
        paddingBottom={3}
        marginTop={7}
        flexDirection="row"
      >
        <Text size="medium" marginRight={2}>
          Balances
        </Text>
        <Text size="medium" color="tealDark">
          {tokens.length}
        </Text>
      </Container>
      {tokens.map(token => (
        <TokenBalance
          address={token.tokenAddress}
          includeBorder
          marginHorizontal={5}
          nativeBalance={token.native.balance.display}
          onPress={() => onPress(token)}
          tokenBalance={token.balance.display}
          tokenSymbol={token.token.symbol}
          zIndex={1}
        />
      ))}
    </ScrollView>
  );
};

const Activities = () => {
  return (
    <ScrollView>
      <Container
        paddingHorizontal={5}
        paddingBottom={3}
        marginTop={7}
        flexDirection="row"
      >
        <Text size="medium" marginRight={2}>
          Activities
        </Text>
      </Container>
    </ScrollView>
  );
};
