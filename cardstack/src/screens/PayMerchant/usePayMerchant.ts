import { useState, useEffect, useCallback, useMemo } from 'react';
import { TransactionReceipt } from 'web3-eth';
import { LayoutAnimation, InteractionManager } from 'react-native';
import { NativeCurrency } from '@cardstack/cardpay-sdk/sdk/currencies';
import { StackActions } from '@react-navigation/routers';
import { getBlockTimestamp, mapPrepaidTxToNavigationParams } from './helpers';
import usePayment from '@cardstack/redux/hooks/usePayment';
import { usePaymentMerchantUniversalLink } from '@cardstack/hooks/merchant/usePaymentMerchantUniversalLink';
import { useMerchantInfoFromDID } from '@cardstack/hooks/merchant/useMerchantInfoFromDID';
import { PrepaidCardType } from '@cardstack/types';
import {
  convertSpendForBalanceDisplay,
  formattedCurrencyToAbsNum,
  nativeCurrencyToAmountInSpend,
} from '@cardstack/utils';
import {
  useNativeCurrencyAndConversionRates,
  usePaymentCurrencyAndConversionRates,
} from '@rainbow-me/redux/hooks';
import { useNavigation } from '@rainbow-me/navigation';
import RainbowRoutes from '@rainbow-me/navigation/routesNames';

export const PAY_STEP = {
  EDIT_AMOUNT: 'EDIT_AMOUNT',
  CHOOSE_PREPAID_CARD: 'CHOOSE_PREPAID_CARD',
  CONFIRMATION: 'CONFIRMATION',
} as const;

type Step = keyof typeof PAY_STEP;

const layoutAnimation = () => {
  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      350,
      LayoutAnimation.Types.easeIn,
      LayoutAnimation.Properties.opacity
    )
  );
};

export const usePayMerchant = () => {
  const { navigate, canGoBack, dispatch } = useNavigation();

  const {
    prepaidCards,
    onConfirm,
    isLoadingTx: onConfirmLoading,
    isLoading,
    data,
  } = usePaymentMerchantUniversalLink();

  const { paymentChangeCurrency } = usePayment();

  const { infoDID = '', amount: initialAmount, currency } = data;

  // Initialize input amount's currency with the currency in merchant payment request link
  useEffect(() => {
    if (currency) {
      paymentChangeCurrency(currency);
    }
  }, [currency, paymentChangeCurrency]);

  const [selectedPrepaidCard, selectPrepaidCard] = useState<PrepaidCardType>();

  const [inputValue, setInputValue] = useState<string | undefined>(
    `${initialAmount ? initialAmount.toString() : 0}`
  );

  const hasMultipleCards = prepaidCards.length > 1;

  const initialStep = hasMultipleCards
    ? PAY_STEP.CHOOSE_PREPAID_CARD
    : PAY_STEP.EDIT_AMOUNT;

  const nextStep = hasMultipleCards
    ? PAY_STEP.CHOOSE_PREPAID_CARD
    : PAY_STEP.CONFIRMATION;

  const [payStep, setPayStep] = useState<Step>(initialStep);

  const { merchantInfoDID } = useMerchantInfoFromDID(infoDID);

  const [
    nativeCurrency,
    currencyConversionRates,
  ] = usePaymentCurrencyAndConversionRates();

  const [accountCurrency] = useNativeCurrencyAndConversionRates();

  // Updating in case first render selected is undefined
  useEffect(() => {
    if (!selectedPrepaidCard?.address) {
      selectPrepaidCard(prepaidCards[0]);
    }
  }, [prepaidCards, selectedPrepaidCard]);

  // Updating amount when nav param change
  useEffect(() => {
    if (initialAmount) {
      setInputValue(initialAmount.toString());
    }
  }, [initialAmount]);

  const spendAmount = useMemo(
    () =>
      nativeCurrencyToAmountInSpend(
        inputValue,
        currencyConversionRates[nativeCurrency]
      ),
    [currencyConversionRates, inputValue, nativeCurrency]
  );

  const onPayMerchantSuccess = useCallback(
    async (receipt: TransactionReceipt) => {
      const { nativeBalanceDisplay } = convertSpendForBalanceDisplay(
        inputValue ? formattedCurrencyToAbsNum(inputValue) : 0,
        accountCurrency,
        currencyConversionRates,
        true
      );

      const timestamp = await getBlockTimestamp(receipt.blockNumber);

      if (canGoBack()) {
        dispatch(StackActions.popToTop());
      }

      // Wait goBack action to navigate
      InteractionManager.runAfterInteractions(() => {
        navigate(
          RainbowRoutes.EXPANDED_ASSET_SHEET,
          mapPrepaidTxToNavigationParams({
            merchantInfo: merchantInfoDID,
            spendAmount,
            nativeBalanceDisplay,
            timestamp,
            transactionHash: receipt.transactionHash,
            prepaidCardAddress: receipt.from,
            prepaidCardCustomization: selectedPrepaidCard?.cardCustomization,
          })
        );
      });
    },
    [
      accountCurrency,
      canGoBack,
      currencyConversionRates,
      dispatch,
      inputValue,
      merchantInfoDID,
      navigate,
      selectedPrepaidCard,
      spendAmount,
    ]
  );

  const onCustomConfirm = useCallback(() => {
    onConfirm(
      spendAmount,
      selectedPrepaidCard?.address || '',
      onPayMerchantSuccess
    );
  }, [onConfirm, spendAmount, selectedPrepaidCard, onPayMerchantSuccess]);

  const onSelectPrepaidCard = useCallback(
    (prepaidCardItem: PrepaidCardType) => {
      selectPrepaidCard(prepaidCardItem);
    },
    []
  );

  const onStepChange = useCallback(
    (step: Step) => () => {
      layoutAnimation();
      setPayStep(step);
    },
    []
  );

  const onCancelConfirmation = useCallback(onStepChange(initialStep), [
    onStepChange,
  ]);

  const onAmountNext = useCallback(onStepChange(nextStep), [onStepChange]);

  const txSheetData = useMemo(
    () => ({
      ...data,
      spendAmount,
      currency:
        nativeCurrency === NativeCurrency.SPD ? currency : nativeCurrency,
      prepaidCard: selectedPrepaidCard?.address,
    }),
    [currency, data, nativeCurrency, selectedPrepaidCard, spendAmount]
  );

  return {
    merchantInfoDID,
    inputValue,
    nativeCurrency,
    selectedPrepaidCard,
    spendAmount,
    payStep,
    txSheetData,
    prepaidCards,
    isLoading,
    onConfirmLoading,
    hasMultipleCards,
    onConfirm: onCustomConfirm,
    onStepChange,
    onSelectPrepaidCard,
    setInputValue,
    onCancelConfirmation,
    onAmountNext,
  };
};
