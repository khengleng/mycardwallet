import React, { useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { SectionList } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { usePrevious } from '../../hooks';
import { CoinRowHeight, ExchangeCoinRow } from '../coin-row';

import { magicMemo } from '@rainbow-me/utils';

const contentContainerStyle = { paddingBottom: 9.5 };
const keyExtractor = ({ uniqueId }) => `ExchangeAssetList-${uniqueId}`;
const scrollIndicatorInsets = { bottom: 24 };
const getItemLayout = ({ showBalance }, index) => {
  const height = showBalance ? CoinRowHeight + 1 : CoinRowHeight;
  return {
    index,
    length: height,
    offset: height * index,
  };
};

const ExchangeAssetSectionList = styled(SectionList).attrs({
  alwaysBounceVertical: true,
  contentContainerStyle,
  directionalLockEnabled: true,
  getItemLayout,
  initialNumToRender: 10,
  keyboardDismissMode: 'none',
  keyboardShouldPersistTaps: 'always',
  keyExtractor,
  maxToRenderPerBatch: 50,
  scrollEventThrottle: 32,
  scrollIndicatorInsets,
  windowSize: 41,
})`
  height: 100%;
`;

const ExchangeAssetList = ({ itemProps, items, onLayout, query }) => {
  const sectionListRef = useRef();
  const prevQuery = usePrevious(query);

  // Scroll to top once the query is cleared
  if (prevQuery && prevQuery.length && !query.length) {
    sectionListRef.current.scrollToLocation({
      animated: true,
      itemIndex: 0,
      sectionIndex: 0,
      viewOffset: 0,
      viewPosition: 0,
    });
  }

  const createItem = useCallback(item => Object.assign(item, itemProps), [
    itemProps,
  ]);

  const handleUnverifiedTokenPress = useCallback(
    item => {
      Alert.alert(
        `Unverified Token`,
        'This token has not been verified! Card Wallet surfaces all tokens that exist on Uniswap. Anyone can create a token, including fake versions of existing tokens and tokens that claim to represent projects that do not have a token. Please do your own research and be careful when interacting with unverified tokens!',
        [
          {
            onPress: () => itemProps.onPress(item),
            text: `Proceed Anyway`,
          },
          {
            style: 'cancel',
            text: 'Go Back',
          },
        ]
      );
    },
    [itemProps]
  );

  const renderItemCallback = useCallback(
    ({ item }) => (
      <ExchangeCoinRow
        {...itemProps}
        isVerified={item.isVerified}
        item={item}
        onUnverifiedTokenPress={handleUnverifiedTokenPress}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ExchangeAssetSectionList
      onLayout={onLayout}
      ref={sectionListRef}
      renderItem={renderItemCallback}
      sections={items.map(createItem)}
    />
  );
};

export default magicMemo(ExchangeAssetList, ['items', 'query']);
