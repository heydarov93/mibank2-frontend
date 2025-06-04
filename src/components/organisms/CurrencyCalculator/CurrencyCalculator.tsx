import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Alert, Box, CircularProgress } from '@mui/material';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledTableTitle } from '../CurrencyExchange/Rates/Rates.styled';

import {
  StyledCurrencyText,
  StyledIconButton,
  StyledInputsColumn,
} from './CurrencyCalculator.styled';

import { CurrencyInput } from 'components/molecules/CurrencyInput/CurrencyInput';
import { useCurrencyCalculator } from 'hooks/useCurrencyCalculator';

const CurrencyCalculator = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Homepage' });
  const {
    isConvertCurrencyError,
    errorMessage,
    exchange,
    rates,
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
      <StyledTableTitle>{t('CurCal.cal')}</StyledTableTitle>

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
        <CurrencyInput
          label={t('CurCal.give')}
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

        <CurrencyInput
          label={t('CurCal.get')}
          fromCurrency={exchange.from.currency}
          toCurrency={exchange.to.currency}
          amount={exchange.to.amount}
          onCurrencyChange={onCurrencyChange(false)}
          onAmountChange={onAmountChange(false)}
          disabled={isConvertLoading}
        />
      </StyledInputsColumn>

      {rates &&
        rates[exchange.from.currency] &&
        rates[exchange.to.currency] && (
          <StyledCurrencyText>
            {t('CurCal.rate')}: 1 {exchange.from.currency} ={' '}
            {(
              rates[exchange.from.currency].buy /
              rates[exchange.to.currency].sell
            ).toFixed(4)}{' '}
            {exchange.to.currency}
          </StyledCurrencyText>
        )}
    </Box>
  );
};

export default CurrencyCalculator;
