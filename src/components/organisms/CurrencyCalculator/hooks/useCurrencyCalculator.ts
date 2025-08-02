import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useExchangeRates } from './useExchangeRates';

import { useConvertCurrencyMutation } from 'api/services/exchange-rate-service/exchange-rates.api';
import { formatAmount } from 'utils/formatters';

interface ConvertedCurrency {
  convertedAmount: number;
  fromCurrency: string;
  toCurrency: string;
}

export const useCurrencyCalculator = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.currencyExchange.calculator',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [exchange, setExchange] = useState({
    from: { currency: 'EUR', amount: '' },
    to: { currency: 'PLN', amount: '' },
  });
  const [lastChangedDirection, setLastChangedDirection] = useState<
    'from' | 'to'
  >('from');

  const [
    convertCurrency,
    { isLoading: isConvertLoading, isError: isConvertError },
  ] = useConvertCurrencyMutation();

  const {
    exchangeRates,
    isLoading: isRatesLoading,
    isError: isRatesError,
  } = useExchangeRates();

  const isConvertCurrencyError = isRatesError || isConvertError;

  const updateExchangeState = (amountValue: string, isFromAmount: boolean) => {
    setExchange((prev) => ({
      ...prev,
      from: isFromAmount ? { ...prev.from, amount: amountValue } : prev.from,
      to: !isFromAmount ? { ...prev.to, amount: amountValue } : prev.to,
    }));
  };

  const updateConvertedAmount = (
    convertedAmount: number,
    isFromAmount: boolean,
  ) => {
    const formattedAmount = formatAmount(convertedAmount);
    setExchange((prev) => ({
      ...prev,
      from: !isFromAmount
        ? { ...prev.from, amount: formattedAmount }
        : prev.from,
      to: isFromAmount ? { ...prev.to, amount: formattedAmount } : prev.to,
    }));
  };

  const handleAmountChange = (
    e: ChangeEvent<HTMLInputElement>,
    isFromAmount: boolean,
  ) => {
    const amountValue = e.target.value;
    updateExchangeState(amountValue, isFromAmount);
    setLastChangedDirection(isFromAmount ? 'from' : 'to');

    const currencyData = {
      amount: Number(amountValue),
      fromCurrency: exchange.from.currency,
      toCurrency: exchange.to.currency,
      fromAmountProvided: isFromAmount,
    };

    convertCurrency(currencyData)
      .unwrap()
      .then((result: ConvertedCurrency) =>
        updateConvertedAmount(result.convertedAmount, isFromAmount),
      )
      .catch(() => setErrorMessage(t('errorMessage')));
  };

  const handleCurrencyChange = (isFromCurrency: boolean, currency: string) => {
    setExchange((prev) => {
      const updated = {
        from: isFromCurrency ? { ...prev.from, currency } : prev.from,
        to: !isFromCurrency ? { ...prev.to, currency } : prev.to,
      };

      const amount = isFromCurrency
        ? Number(updated.from.amount)
        : Number(updated.to.amount);

      if (amount) {
        const currencyData = {
          amount,
          fromCurrency: updated.from.currency,
          toCurrency: updated.to.currency,
          fromAmountProvided: isFromCurrency,
        };
        convertCurrency(currencyData);
      }

      return updated;
    });
  };

  const handleSwap = () => {
    setExchange((prev) => ({
      from: prev.to,
      to: prev.from,
    }));
  };

  useEffect(() => {
    if (isConvertCurrencyError) {
      setErrorMessage(t('errorMessage'));
    }
  }, [isConvertCurrencyError]);

  return {
    isConvertCurrencyError,
    errorMessage,
    exchange,
    exchangeRates,
    isLoadingCurrent: isRatesLoading,
    isConvertLoading: isConvertLoading,
    handleAmountChange,
    handleCurrencyChange,
    handleSwap,
    lastChangedDirection,
  };
};
