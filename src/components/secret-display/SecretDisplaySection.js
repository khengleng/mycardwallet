import { useRoute } from '@react-navigation/native';
import { captureException } from '@sentry/react-native';
import React, { Fragment, useCallback, useEffect, useState } from 'react';

import {
  identifyWalletType,
  loadSeedPhraseAndMigrateIfNeeded,
} from '../../model/wallet';
import ActivityIndicator from '../ActivityIndicator';
import Spinner from '../Spinner';
import { ColumnWithMargins } from '../layout';
import SecretDisplayCard from './SecretDisplayCard';
import { Button, Text } from '@cardstack/components';
import WalletTypes from '@rainbow-me/helpers/walletTypes';
import { useClipboard, useWallets } from '@rainbow-me/hooks';
import logger from 'logger';

const LoadingSpinner = android ? Spinner : ActivityIndicator;

export default function SecretDisplaySection({
  onSecretLoaded,
  onWalletTypeIdentified,
  setCopyCount,
  setCopiedText,
}) {
  const { params } = useRoute();
  const { selectedWallet, wallets } = useWallets();
  const walletId = params?.walletId || selectedWallet.id;
  const currentWallet = wallets[walletId];
  const [visible, setVisible] = useState(true);
  const [seed, setSeed] = useState(null);
  const [type, setType] = useState(currentWallet?.type);

  const loadSeed = useCallback(async () => {
    try {
      const s = await loadSeedPhraseAndMigrateIfNeeded(walletId);
      if (s) {
        const walletType = identifyWalletType(s);
        setType(walletType);
        onWalletTypeIdentified?.(walletType);
        setSeed(s);
      }
      setVisible(!!s);
      onSecretLoaded?.(!!s);
    } catch (e) {
      logger.sentry('Error while trying to reveal secret', e);
      captureException(e);
      setVisible(false);
      onSecretLoaded?.(false);
    }
  }, [onSecretLoaded, onWalletTypeIdentified, walletId]);

  useEffect(() => {
    // Android doesn't like to show the faceID prompt
    // while the view isn't fully visible
    // so we have to add a timeout to prevent the app from freezing
    android
      ? setTimeout(() => {
          loadSeed();
        }, 300)
      : loadSeed();
  }, [loadSeed]);

  const typeLabel = type === WalletTypes.privateKey ? 'key' : 'phrase';

  const { colors } = useTheme();

  const { setClipboard } = useClipboard();
  const handlePressCopySeed = () => {
    setClipboard(seed);
    setCopiedText(seed);
    setCopyCount(count => count + 1);
  };

  return (
    <ColumnWithMargins
      align="center"
      justify="center"
      margin={24}
      paddingHorizontal={20}
      width="100%"
    >
      {visible ? (
        <Fragment>
          {seed ? (
            <Fragment>
              <SecretDisplayCard seed={seed} type={type} />
              <Button
                iconProps={{
                  name: 'copy',
                }}
                onPress={handlePressCopySeed}
                variant="white"
                width="100%"
              >
                Copy to clipboard
              </Button>
            </Fragment>
          ) : (
            <LoadingSpinner color={colors.blueGreyDark50} />
          )}
        </Fragment>
      ) : (
        <Fragment>
          <Text textAlign="center">
            {`You need to authenticate in order to access your recovery ${typeLabel}`}
          </Text>
          <Button
            iconProps={{ name: 'face-id' }}
            onPress={loadSeed}
            variant="white"
            width="100%"
          >
            Show Secret Recovery Phrase
          </Button>
        </Fragment>
      )}
    </ColumnWithMargins>
  );
}
