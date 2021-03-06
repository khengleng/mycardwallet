import React, { useMemo } from 'react';
import { abbreviations } from '../../utils';
import { Text } from '@cardstack/components';

export default function TruncatedAddress({
  address,
  firstSectionLength,
  truncationLength,
  ...props
}) {
  const text = useMemo(
    () =>
      address
        ? abbreviations.formatAddressForDisplay(
            address,
            truncationLength,
            firstSectionLength
          )
        : 'Error displaying address',
    [address, firstSectionLength, truncationLength]
  );

  return (
    <Text fontFamily="RobotoMono-Regular" {...props}>
      {text}
    </Text>
  );
}
