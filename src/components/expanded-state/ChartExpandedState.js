import { getConstantByNetwork } from '@cardstack/cardpay-sdk';
import { find } from 'lodash';
import React, { useRef } from 'react';
import { getSoftMenuBarHeight } from 'react-native-extra-dimensions-android';

import {
  useAccountSettings,
  useChartThrottledPoints,
  useUniswapAssetsInWallet,
} from '../../hooks';
import {
  BuyActionButton,
  SendActionButton,
  SheetActionButtonRow,
  SheetDivider,
  SlackSheet,
  SwapActionButton,
} from '../sheet';
import {
  TokenInfoBalanceValue,
  TokenInfoItem,
  TokenInfoRow,
  TokenInfoSection,
} from '../token-info';
import { Chart } from '../value-chart';
import { Container } from '@cardstack/components';
import { isLayer1 } from '@cardstack/utils';
import { ChartPathProvider } from '@rainbow-me/animated-charts';
import AssetInputTypes from '@rainbow-me/helpers/assetInputTypes';
import { useSelector } from 'react-redux';

const baseHeight = 309 + (android && 20 - getSoftMenuBarHeight());
const heightWithoutChart = baseHeight + (android && 30);
const heightWithChart = baseHeight + 310;

export const initialChartExpandedStateSheetHeight = heightWithChart;

export default function ChartExpandedState(props) {
  const nativeCurrency = useSelector(state => state.settings.nativeCurrency);

  const asset = props.asset?.token ? props.asset.token : props.asset;

  const {
    chart,
    chartData,
    chartType,
    color,
    fetchingCharts,
    initialChartDataLabels,
    showChart,
    throttledData,
  } = useChartThrottledPoints({
    asset,
    heightWithChart,
    heightWithoutChart,
  });

  const { network } = useAccountSettings();
  const { uniswapAssetsInWallet } = useUniswapAssetsInWallet();
  const showSwapButton = isLayer1(network)
    ? find(uniswapAssetsInWallet, ['uniqueId', asset.uniqueId])
    : false;

  const nativeTokenAddress = getConstantByNetwork(
    'nativeTokenAddress',
    network
  );
  const needsEth =
    asset.address === nativeTokenAddress && asset.balance.amount === '0';

  const duration = useRef(0);

  if (duration.current === 0) {
    duration.current = 300;
  }
  const ChartExpandedStateSheetHeight =
    ios || showChart ? heightWithChart : heightWithoutChart;

  return (
    <SlackSheet
      additionalTopPadding={android}
      contentHeight={ChartExpandedStateSheetHeight}
      scrollEnabled={false}
    >
      <ChartPathProvider data={throttledData}>
        <Chart
          {...chartData}
          {...initialChartDataLabels}
          asset={asset}
          chart={chart}
          chartType={chartType}
          color={color}
          fetchingCharts={fetchingCharts}
          nativePoints={chart}
          showChart={showChart}
          throttledData={throttledData}
        />
      </ChartPathProvider>
      <SheetDivider />
      <TokenInfoSection>
        <TokenInfoRow>
          <TokenInfoItem asset={asset} title="Balance">
            <TokenInfoBalanceValue />
          </TokenInfoItem>
          {asset?.native?.price.display && (
            <TokenInfoItem align="right" title="Value" weight="bold">
              {`${asset?.native?.balance.display} ${nativeCurrency}`}
            </TokenInfoItem>
          )}
        </TokenInfoRow>
      </TokenInfoSection>
      {needsEth ? (
        <SheetActionButtonRow>
          <BuyActionButton color={color} fullWidth />
        </SheetActionButtonRow>
      ) : (
        <Container
          alignItems="center"
          flexDirection="row"
          justifyContent="space-around"
          paddingTop={2}
          width="100%"
        >
          {showSwapButton && (
            <SwapActionButton color={color} inputType={AssetInputTypes.in} />
          )}
          <SendActionButton color={color} small={showSwapButton} />
        </Container>
      )}
    </SlackSheet>
  );
}
