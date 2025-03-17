import SwapVertIcon from '@mui/icons-material/SwapVert';
import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  Typography,
  Alert,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  currenciesWithLabel,
  currentDate,
  formatAmount,
  MAX_DIGITS,
} from '../../../utils/currencyUtils';
import { StyledTableTitle } from '../CurrencyExchange/Rates/Rates.styled';

import { useGetExchangeRatesQuery } from 'api/getExchangeRatesApi';
import { ReactComponent as SpinningArrowButton } from 'assets/icons/Reload.svg';
import { REG_EXP } from 'validation/regExp';

const CurrencyCalculator = () => {
  const theme = useTheme();
  const { t } = useTranslation('translation', { keyPrefix: 'Homepage' });

  const [exchange, setExchange] = useState({
    from: { currency: 'USD', amount: '' },
    to: { currency: 'EUR', amount: '' },
  });
  const [error, setError] = useState<string | null>(null);

  const {
    data: currentData,
    isLoading: isLoadingCurrent,
    error: queryError,
  } = useGetExchangeRatesQuery(currentDate);

  useEffect(() => {
    if (queryError) {
      setError(t('CurCal.error'));
    }
  }, [queryError]);

  const rates =
    currentData &&
    currentData?.[0]?.rates?.reduce(
      (
        acc: { [x: string]: { buy: number; sell: number } },
        rate: { code: string | number; bid: number; ask: number },
      ) => {
        acc[rate.code] = {
          buy: rate.bid,
          sell: rate.ask,
        };
        return acc;
      },
      {},
    );

  const calculateExchange = (
    value: string,
    fromCurrency: string,
    toCurrency: string,
    isFromAmount: boolean,
  ) => {
    if (value === '') {
      setExchange((prev) => ({
        from: { ...prev.from, amount: '' },
        to: { ...prev.to, amount: '' },
      }));
      return;
    }

    const cleanValue = value
      .replace(REG_EXP.invalidCharacter, '')
      .replace(REG_EXP.extraComma, '');
    if (cleanValue.length > MAX_DIGITS) return;

    const numValue = parseFloat(cleanValue);
    if (isNaN(numValue)) return;

    if (rates && rates[fromCurrency] && rates[toCurrency]) {
      if (isFromAmount) {
        const result =
          (numValue * rates[fromCurrency].buy) / rates[toCurrency].sell;
        setExchange((prev) => ({
          ...prev,
          from: { ...prev.from, amount: cleanValue },
          to: { ...prev.to, amount: formatAmount(result) },
        }));
      } else {
        const result =
          (numValue * rates[toCurrency].sell) / rates[fromCurrency].buy;
        setExchange((prev) => ({
          ...prev,
          to: { ...prev.to, amount: cleanValue },
          from: { ...prev.from, amount: formatAmount(result) },
        }));
      }
    }
  };

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isFromAmount: boolean,
  ) => {
    const value = e.target.value;
    calculateExchange(
      value,
      exchange.from.currency,
      exchange.to.currency,
      isFromAmount,
    );
  };

  const handleCurrencyChange = (isFromCurrency: boolean, currency: string) => {
    setExchange((prev) => ({
      from: isFromCurrency ? { ...prev.from, currency } : prev.from,
      to: !isFromCurrency ? { ...prev.to, currency } : prev.to,
    }));

    calculateExchange(
      isFromCurrency ? exchange.from.amount : exchange.to.amount,
      isFromCurrency ? currency : exchange.from.currency,
      isFromCurrency ? exchange.to.currency : currency,
      isFromCurrency,
    );
  };

  const handleSwap = () => {
    setExchange((prev) => ({
      from: prev.to,
      to: prev.from,
    }));
  };

  if (isLoadingCurrent) return <SpinningArrowButton />;

  return (
    <Box sx={{ maxWidth: '479px' }}>
      <StyledTableTitle>{t('CurCal.cal')}</StyledTableTitle>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        border={2}
        borderRadius={2}
        borderColor={theme.palette.primary.light}
        padding={2}
        sx={{ marginBottom: -1, marginTop: 1.5 }}
      >
        <Typography color={theme.palette.grey[400]} fontSize="14px">
          {t('CurCal.give')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            select
            value={exchange.from.currency}
            onChange={(e) => handleCurrencyChange(true, e.target.value)}
            size="small"
            sx={{ width: '30%' }}
          >
            {currenciesWithLabel.map((option) => (
              <MenuItem
                key={option.code}
                value={option.code}
                disabled={option.code === exchange.to.currency}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={exchange.from.amount}
            onChange={(e) =>
              handleAmountChange(e as React.ChangeEvent<HTMLInputElement>, true)
            }
            size="small"
            type="text"
            sx={{ width: '65%' }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: '50px',
          textAlign: 'center',
          margin: 'auto',
          borderRadius: 2,
          mt: 1,
          mb: 1,
          bgcolor: theme.palette.primary.main,
        }}
      >
        <IconButton onClick={handleSwap}>
          <SwapVertIcon
            fontSize="large"
            htmlColor={theme.palette.common.white}
          />
        </IconButton>
      </Box>

      <Box
        border={2}
        borderRadius={2}
        borderColor={theme.palette.primary.light}
        padding={2}
        sx={{ marginTop: -1 }}
      >
        <Typography color={theme.palette.grey[400]} fontSize="14px">
          {t('CurCal.get')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            select
            value={exchange.to.currency}
            onChange={(e) => handleCurrencyChange(false, e.target.value)}
            size="small"
            sx={{ width: '30%' }}
          >
            {currenciesWithLabel.map((option) => (
              <MenuItem
                key={option.code}
                value={option.code}
                disabled={option.code === exchange.from.currency}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={exchange.to.amount}
            onChange={(e) =>
              handleAmountChange(
                e as React.ChangeEvent<HTMLInputElement>,
                false,
              )
            }
            size="small"
            type="text"
            sx={{ width: '65%' }}
          />
        </Box>
      </Box>

      {rates &&
        rates[exchange.from.currency] &&
        rates[exchange.to.currency] && (
          <Typography mt={1} variant="body2" color="textSecondary">
            {t('CurCal.rate')}: 1 {exchange.from.currency} ={' '}
            {(
              rates[exchange.from.currency].buy /
              rates[exchange.to.currency].sell
            ).toFixed(4)}{' '}
            {exchange.to.currency}
          </Typography>
        )}
    </Box>
  );
};

export default CurrencyCalculator;
