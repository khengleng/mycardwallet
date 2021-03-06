import React, { useCallback } from 'react';

import { useDimensions } from '../../hooks';
import { ButtonPressAnimation } from '../animations';

import {
  CenteredContainer,
  Container,
  Icon,
  Text,
} from '@cardstack/components';

const KeyboardButton = ({ children, ...props }) => {
  const { isTallPhone } = useDimensions();
  const keyHeight = isTallPhone ? 80 : 55;
  const keyWidth = isTallPhone ? 100 : 80;

  return (
    <ButtonPressAnimation
      {...props}
      duration={35}
      pressOutDuration={75}
      scaleTo={1.6}
      transformOrigin={[0.5, 0.5 + 8 / keyHeight]}
    >
      <CenteredContainer
        height={keyHeight}
        style={{ transform: [{ scale: 0.5 }] }}
        width={keyWidth}
      >
        {children}
      </CenteredContainer>
    </ButtonPressAnimation>
  );
};

const Numpad = ({ decimal = true, onPress, width }) => {
  const renderCell = useCallback(
    symbol => (
      <KeyboardButton
        key={symbol}
        onPress={() => onPress(symbol.toString())}
        testID={`numpad-button-${symbol}`}
      >
        <Text fontSize={44} fontWeight="600" textAlign="center">
          {symbol}
        </Text>
      </KeyboardButton>
    ),
    [onPress]
  );

  const renderRow = useCallback(
    cells => (
      <Container alignItems="center" flexDirection="row">
        {cells.map(renderCell)}
      </Container>
    ),
    [renderCell]
  );

  return (
    <CenteredContainer width={width}>
      {renderRow([1, 2, 3])}
      {renderRow([4, 5, 6])}
      {renderRow([7, 8, 9])}
      <Container flexDirection="row">
        {decimal ? renderCell('.') : <Container width={80} />}
        {renderCell(0)}
        <KeyboardButton onPress={() => onPress('back')}>
          <Icon color="black" name="delete" size={55} textAlign="center" />
        </KeyboardButton>
      </Container>
    </CenteredContainer>
  );
};

export default Numpad;
