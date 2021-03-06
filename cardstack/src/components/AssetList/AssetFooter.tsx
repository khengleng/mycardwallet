import React from 'react';
import { LayoutAnimation } from 'react-native';
import { AssetListSectionItem, Button, Container } from '@cardstack/components';
import { usePinnedAndHiddenItemOptions } from '@rainbow-me/hooks';

interface AssetListProps {
  sections: AssetListSectionItem<any>[];
}

export const AssetFooter = ({ sections }: AssetListProps) => {
  const {
    editing,
    selected,
    pinned,
    hidden,
    pin,
    unpin,
    show,
    hide,
  } = usePinnedAndHiddenItemOptions();

  const isInitialSelectionPinned = pinned.includes(selected[0]);
  const isInitialSelectionHidden = hidden.includes(selected[0]);

  const sectionCount = sections.find(section =>
    section.data.every(item => (item.address = selected[0]))
  )?.header.count;

  const buttonsDisabled = selected?.length === 0; //selected length is zero
  const hiddenButtonDisabled = buttonsDisabled || sectionCount === 1;

  const handleHiddenPress = () => {
    if (isInitialSelectionHidden) {
      show();
    } else {
      hide();
    }

    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
    );
  };

  const handlePinnedPress = () => {
    if (isInitialSelectionPinned) {
      unpin();
    } else {
      pin();
    }

    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
    );
  };

  if (!editing) {
    return null;
  }

  return (
    <Container
      bottom={80}
      flexDirection="row"
      justifyContent="space-around"
      padding={4}
      position="absolute"
      width="100%"
    >
      <Button
        disabled={buttonsDisabled}
        iconProps={
          !isInitialSelectionPinned
            ? {
                iconFamily: 'MaterialCommunity',
                iconSize: 'medium',
                marginRight: 2,
                name: 'pin',
              }
            : {
                iconFamily: 'MaterialCommunity',
                iconSize: 'medium',
                marginRight: 2,
                name: 'pin-off',
              }
        }
        onPress={handlePinnedPress}
        variant="small"
      >
        {isInitialSelectionPinned ? 'Unpin' : 'Pin'}
      </Button>
      <Button
        disabled={hiddenButtonDisabled}
        iconProps={
          !isInitialSelectionHidden
            ? {
                iconSize: 'medium',
                marginRight: 2,
                name: 'eye-off',
              }
            : {
                iconSize: 'medium',
                marginRight: 2,
                name: 'eye',
              }
        }
        onPress={handleHiddenPress}
        variant="small"
      >
        {isInitialSelectionHidden ? 'Unhide' : 'Hide'}
      </Button>
    </Container>
  );
};
