import React, { useCallback } from 'react';
import { RadioList } from '../';
import usePayment from '@cardstack/redux/hooks/usePayment';
import { supportedNativeCurrencies } from '@rainbow-me/references';

const SPDCurrency = {
  alignment: 'left',
  assetLimit: 1,
  currency: 'SPD',
  decimals: 2,
  emojiName: '§',
  label: 'SPEND',
  mask: '[099999999999]{.}[00]',
  placeholder: '0.00',
  smallThreshold: 1,
  symbol: '§',
};

export const CurrencySelection = ({
  onChange,
}: {
  onChange: (selectedCurrency: string) => void;
}) => {
  const { paymentChangeCurrency, currency } = usePayment();

  const onSelectCurrency = useCallback(
    (selectedCurrency: string) => {
      if (currency !== selectedCurrency) {
        paymentChangeCurrency(selectedCurrency);
        onChange(selectedCurrency);
      }
    },
    [currency, paymentChangeCurrency, onChange]
  );

  const currencyListItems = [
    SPDCurrency,
    ...Object.values(supportedNativeCurrencies),
  ]
    .map(({ currency: nativeCurrency, label, ...item }, index) => ({
      ...item,
      disabled: false,
      label: `${label} (${
        nativeCurrency === 'SPD' ? '§1 = 0.01 USD' : nativeCurrency
      })`,
      key: index,
      index: index,
      value: nativeCurrency,
      selected: nativeCurrency === currency,
    }))
    .filter(({ value }) => value !== 'ETH');

  return (
    <RadioList
      items={[{ data: currencyListItems }]}
      onChange={onSelectCurrency}
    />
  );
};