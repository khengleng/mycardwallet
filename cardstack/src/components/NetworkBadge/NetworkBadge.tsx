import React from 'react';
import { ContainerProps } from '../Container';
import { Container, Text } from '@cardstack/components';
import { useRainbowSelector } from '@rainbow-me/redux/hooks';

export const NetworkBadge = (props: ContainerProps & { text?: string }) => {
  const networkName = useRainbowSelector(state => state.settings.network);

  return (
    <Container flexDirection="row" {...props}>
      <Container
        backgroundColor="backgroundLightGray"
        paddingHorizontal={2}
        style={{ paddingVertical: 1 }}
        borderRadius={50}
      >
        <Text color="networkBadge" fontSize={9} weight="bold">
          {props.text || `ON ${networkName.toUpperCase()}`}
        </Text>
      </Container>
    </Container>
  );
};
