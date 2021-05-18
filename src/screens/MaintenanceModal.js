import React from 'react';

import { Container, Icon, Text } from '@cardstack/components';

export default function MaintenanceModal() {
  return (
    <Container
      alignItems="center"
      flex={1}
      justifyContent="center"
      // paddingHorizontal={4}
      testID="maintenance-modal"
    >
      <Container
        alignItems="center"
        backgroundColor="white"
        flex={1}
        justifyContent="center"
      >
        <Container
          alignItems="center"
          paddingHorizontal={15}
          paddingVertical={10}
        >
          <Container
            alignItems="center"
            justifyContent="center"
            marginBottom={5}
          >
            <Icon color="blue" name="settings" size={60} />
            <Text size="large" textAlign="center">
              Maintenance
            </Text>
            <Text textAlign="center">
              The app is going through scheduled maintenance, please try again
              later.
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
