import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useConvertCurrencyMutation } from 'api/convertCurrencyApi';
import { useGetCurrentRatesQuery } from 'api/getExchangeRatesApi';
import { formatAmount } from 'utils/currencyUtils';

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
    from: { currency: 'USD', amount: '' },
    to: { currency: 'EUR', amount: '' },
  });

  const [
    convertCurrency,
    { isLoading: isConvertLoading, isError: isConvertError },
  ] = useConvertCurrencyMutation();

  const {
    data: currentData,
    isLoading: isLoadingCurrent,
    isError: isCurrentError,
  } = useGetCurrentRatesQuery(null);

  const rates = useMemo(() => {
    return currentData?.[0]?.rates?.reduce(
      (
        acc: { [key: string]: { buy: number; sell: number } },
        rate: { code: string; bid: number; ask: number },
      ) => {
        acc[rate.code.toUpperCase()] = {
          buy: rate.bid,
          sell: rate.ask,
        };
        return acc;
      },
      { PLN: { buy: 1, sell: 1 } },
    );
  }, [currentData]);

  const isConvertCurrencyError = isCurrentError || isConvertError;

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
      to: isFromAmount ? { ...prev.to, amount: formattedAmount } : prev.to,
      from: !isFromAmount
        ? { ...prev.from, amount: formattedAmount }
        : prev.from,
    }));
  };

  const handleAmountChange = (
    e: ChangeEvent<HTMLInputElement>,
    isFromAmount: boolean,
  ) => {
    const amountValue = e.target.value;
    updateExchangeState(amountValue, isFromAmount);

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

      const amount = isFromCurrency ? updated.from.amount : updated.to.amount;

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
    rates,
    isLoadingCurrent,
    isConvertLoading,
    handleAmountChange,
    handleCurrencyChange,
    handleSwap,
  };
};
