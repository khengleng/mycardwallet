import React, { useEffect, useState } from 'react';
import { web3Provider } from '../../handlers/web3';
import networkInfo from '../../helpers/networkInfo';
import { useAccountSettings, useInternetStatus } from '../../hooks';
import { Nbsp, Text } from '../text';
import Toast from './Toast';

const TestnetToast = () => {
  const isConnected = useInternetStatus();
  const { network } = useAccountSettings();
  const providerUrl = web3Provider?.connection?.url;
  const { name, isTestnet } = networkInfo[network];
  const [visible, setVisible] = useState(isTestnet);
  const [networkName, setNetworkName] = useState(name);

  useEffect(() => {
    setVisible(true);
    setNetworkName(name + (isConnected ? '' : ' (offline)'));
  }, [name, network, providerUrl, isConnected, isTestnet]);

  const { colors } = useTheme();

  return (
    <Toast isVisible={visible} testID={`testnet-toast-${networkName}`}>
      <Text color={colors.white} size="smedium" weight="semibold">
        <Nbsp /> {networkName} <Nbsp />
      </Text>
    </Toast>
  );
};

export default TestnetToast;
