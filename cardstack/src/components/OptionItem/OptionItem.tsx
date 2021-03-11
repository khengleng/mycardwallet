import React from 'react';

import { Container, CenteredContainer, ContainerProps } from '../Container';
import { Icon, IconProps } from '../Icon';
import { Text, TextProps } from '../Text';
import { Touchable } from '../Touchable';

interface OptionItemProps extends ContainerProps {
  onPress: () => void;
  iconProps: IconProps;
  title: string;
  subText?: string;
  textProps: TextProps;
  borderIcon?: boolean;
  horizontalSpacing?: number;
}

export const OptionItem = ({
  onPress,
  iconProps,
  title,
  subText,
  textProps,
  borderIcon,
  horizontalSpacing = 2,
  ...props
}: OptionItemProps) => {
  return (
    <Touchable
      alignItems="center"
      flexDirection="row"
      left={20}
      onPress={onPress}
      testID="option-item"
      {...props}
    >
      <CenteredContainer
        borderColor="borderGray"
        borderRadius={100}
        borderWidth={borderIcon ? 1 : 0}
        height={40}
        marginRight={horizontalSpacing}
        width={40}
        testID="option-item-icon-wrapper"
      >
        <Icon color="settingsGray" {...iconProps} />
      </CenteredContainer>
      <Container>
        <Text fontWeight="600" {...textProps}>
          {title}
        </Text>
        {subText && (
          <Text variant="subText" marginTop={1}>
            {subText}
          </Text>
        )}
      </Container>
    </Touchable>
  );
};
