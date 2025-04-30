import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Alert, CircularProgress, IconButton, useTheme } from '@mui/material';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledTableTitle } from '../CurrencyExchange/Rates/Rates.styled';

import {
  StyledContainer,
  StyledCurrencyText,
  StyledInputsColumn,
  StyledSwapIcon,
} from './CurrencyCalculator.styled';

import { CurrencyInput } from 'components/molecules/CurrencyInput/CurrencyInput';
import { useCurrencyCalculator } from 'hooks/useCurrencyCalculator';

const CurrencyCalculator = () => {
  const theme = useTheme();
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

  return (
    <StyledContainer>
      <StyledTableTitle>{t('CurCal.cal')}</StyledTableTitle>

      {isConvertCurrencyError && (
        <Alert
          sx={{ marginBottom: '5px' }}
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
          onCurrencyChange={(currency: string) =>
            handleCurrencyChange(true, currency)
          }
          onAmountChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleAmountChange(e, true)
          }
        />

        <StyledSwapIcon data-testid="swap-button">
          <IconButton onClick={handleSwap}>
            <SwapVertIcon
              fontSize="large"
              htmlColor={theme.palette.common.white}
            />
          </IconButton>
        </StyledSwapIcon>

        <CurrencyInput
          label={t('CurCal.get')}
          fromCurrency={exchange.from.currency}
          toCurrency={exchange.to.currency}
          amount={exchange.to.amount}
          onCurrencyChange={(currency: string) =>
            handleCurrencyChange(false, currency)
          }
          onAmountChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleAmountChange(e, false)
          }
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
    </StyledContainer>
  );
};

export default CurrencyCalculator;
