import { captureException } from '@sentry/react-native';
import { useCallback } from 'react';
import { InteractionManager } from 'react-native';
import { useDispatch } from 'react-redux';
import { uniqueTokensRefreshState } from '../redux/uniqueTokens';
import { uniswapGetAllExchanges, uniswapPairsInit } from '../redux/uniswap';
import { explorerInit } from '@rainbow-me/redux/explorer';
import { fallbackExplorerInit } from '@rainbow-me/redux/fallbackExplorer';
import logger from 'logger';

export default function useInitializeAccountData() {
  const dispatch = useDispatch();

  const initializeAccountData = useCallback(async () => {
    try {
      InteractionManager.runAfterInteractions(() => {
        logger.sentry('Initialize account data');
        dispatch(explorerInit());
        dispatch(fallbackExplorerInit());
      });

      InteractionManager.runAfterInteractions(async () => {
        logger.sentry('Initialize uniswapPairsInit & getAllExchanges');
        dispatch(uniswapPairsInit());
        await dispatch(uniswapGetAllExchanges());
      });

      InteractionManager.runAfterInteractions(async () => {
        logger.sentry('Initialize uniqueTokens');
        await dispatch(uniqueTokensRefreshState());
      });
    } catch (error) {
      logger.sentry('Error initializing account data');
      captureException(error);
    }
  }, [dispatch]);

  return initializeAccountData;
}
