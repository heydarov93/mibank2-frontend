import SwapVertIcon from '@mui/icons-material/SwapVert';
import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledTableTitle } from '../CurrencyExchange/Rates/Rates.styled';

import {
  currenciesWithLabel,
  formatAmount,
  MAX_DIGITS,
  STATIC_RATES,
} from './currencyUtils';

import { REG_EXP } from 'validation/regExp';

const CurrencyCalculator = () => {
  const theme = useTheme();
  const { t } = useTranslation('translation', { keyPrefix: 'Homepage' });

  const [exchange, setExchange] = useState({
    from: { currency: 'USD', amount: '' },
    to: { currency: 'EUR', amount: '' },
  });

  const filteredCurrency = currenciesWithLabel
    .filter((option) => option.code !== exchange.to.currency)
    .map((option) => (
      <MenuItem key={option.code} value={option.code}>
        {option.label}
      </MenuItem>
    ));

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

    if (isFromAmount) {
      const fromBuyRate = STATIC_RATES[fromCurrency]?.buy;
      const toSellRate = STATIC_RATES[toCurrency]?.sell;
      const result = (numValue * fromBuyRate) / toSellRate;

      setExchange((prev) => ({
        ...prev,
        from: { ...prev.from, amount: cleanValue },
        to: { ...prev.to, amount: formatAmount(result) },
      }));
    } else {
      const fromBuyRate = STATIC_RATES[fromCurrency]?.buy;
      const toSellRate = STATIC_RATES[toCurrency]?.sell;
      const result = (numValue * toSellRate) / fromBuyRate;

      setExchange((prev) => ({
        ...prev,
        to: { ...prev.to, amount: cleanValue },
        from: { ...prev.from, amount: formatAmount(result) },
      }));
    }
  };

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isFromAmount: boolean,
  ) => {
    const value = e.target.value;
    if (isFromAmount) {
      calculateExchange(
        value,
        exchange.from.currency,
        exchange.to.currency,
        true,
      );
    } else {
      calculateExchange(
        value,
        exchange.from.currency,
        exchange.to.currency,
        false,
      );
    }
  };

  const handleCurrencyChange = (isFromCurrency: boolean, currency: string) => {
    setExchange((prev) => ({
      ...prev,
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

  return (
    <Box sx={{ maxWidth: '479px' }}>
      <StyledTableTitle>{t('CurCal.cal')}</StyledTableTitle>
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
            {filteredCurrency}
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
            {currenciesWithLabel
              .filter((option) => option.code !== exchange.from.currency)
              .map((option) => (
                <MenuItem key={option.code} value={option.code}>
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

      {STATIC_RATES[exchange.from.currency] &&
        STATIC_RATES[exchange.to.currency] && (
          <Typography marginTop={0.5} variant="body2" color="textSecondary">
            {t('CurCal.rate')}: 1 {exchange.from.currency} ={' '}
            {(
              STATIC_RATES[exchange.from.currency].buy /
              STATIC_RATES[exchange.to.currency].sell
            ).toFixed(4)}{' '}
            {exchange.to.currency}
          </Typography>
        )}
    </Box>
  );
};

export default CurrencyCalculator;
