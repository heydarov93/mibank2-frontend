import SwapVertIcon from '@mui/icons-material/SwapVert';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledCurrencyText,
  StyledIconButton,
  StyledInputsColumn,
  StyledTitle,
} from './CurrencyCalculator.styled';
import { useCurrencyCalculator } from './hooks';
import { ExchangeInputBox } from './molecules';

export const CurrencyCalculator = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.currencyExchange.calculator',
  });
  const {
    isConvertCurrencyError,
    errorMessage,
    exchange,
    exchangeRates,
    isLoadingCurrent,
    isConvertLoading,
    handleAmountChange,
    handleCurrencyChange,
    handleSwap,
  } = useCurrencyCalculator();

  if (isLoadingCurrent)
    return <CircularProgress data-testid="loading-spinner" />;

  const onCurrencyChange = (isFromCurrency: boolean) => (currency: string) =>
    handleCurrencyChange(isFromCurrency, currency);

  const onAmountChange =
    (isFromCurrency: boolean) => (e: ChangeEvent<HTMLInputElement>) =>
      handleAmountChange(e, isFromCurrency);

  return (
    <Box>
      <StyledTitle>{t('title')}</StyledTitle>

      {isConvertCurrencyError && (
        <Alert
          sx={{ marginBottom: 1 }}
          severity="error"
          data-testid="error-message-box"
        >
          {errorMessage}
        </Alert>
      )}

      <StyledInputsColumn>
        <ExchangeInputBox
          label={t('give')}
          fromCurrency={exchange.to.currency}
          toCurrency={exchange.from.currency}
          amount={exchange.from.amount}
          onCurrencyChange={onCurrencyChange(true)}
          onAmountChange={onAmountChange(true)}
        />

        <StyledIconButton
          onClick={handleSwap}
          size="medium"
          data-testid="swap-button"
        >
          <SwapVertIcon />
        </StyledIconButton>

        <ExchangeInputBox
          label={t('get')}
          fromCurrency={exchange.from.currency}
          toCurrency={exchange.to.currency}
          amount={exchange.to.amount}
          onCurrencyChange={onCurrencyChange(false)}
          onAmountChange={onAmountChange(false)}
          disabled={isConvertLoading}
        />
      </StyledInputsColumn>

      {exchangeRates &&
        exchangeRates[exchange.from.currency] &&
        exchangeRates[exchange.to.currency] && (
          <StyledCurrencyText>
            {t('rate')}: 1 {exchange.from.currency} ={' '}
            {(
              exchangeRates[exchange.from.currency].buy /
              exchangeRates[exchange.to.currency].sell
            ).toFixed(4)}{' '}
            {exchange.to.currency}
          </StyledCurrencyText>
        )}
    </Box>
  );
};
