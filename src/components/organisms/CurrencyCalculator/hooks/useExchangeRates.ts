import { useMemo } from 'react';

import { useGetCurrentRatesQuery } from 'api/services/exchange-rate-service/exchange-rates.api';

export const useExchangeRates = () => {
  const {
    data: exchangeRates,
    isLoading,
    isError,
  } = useGetCurrentRatesQuery(null);

  const rates = useMemo(() => {
    return exchangeRates?.[0]?.rates?.reduce(
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
  }, [exchangeRates]);

  return { exchangeRates: rates, isLoading, isError };
};
