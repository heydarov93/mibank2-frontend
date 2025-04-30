import { MenuItem, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

import {
  StyledInputContainer,
  StyledInputLabel,
  StyledInputRow,
} from './CurrencyInput.styled';

import { currenciesWithLabel } from 'utils/currencyUtils';

interface CurrencyInputProps {
  label: string;
  fromCurrency?: string;
  toCurrency?: string;
  amount: string;
  onCurrencyChange: (currency: string) => void;
  onAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const CurrencyInput = ({
  label,
  fromCurrency,
  toCurrency,
  amount,
  onCurrencyChange,
  onAmountChange,
  disabled,
}: CurrencyInputProps) => (
  <StyledInputContainer>
    <StyledInputLabel>{label}</StyledInputLabel>
    <StyledInputRow>
      <TextField
        select
        value={toCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        size="small"
        sx={{ width: '30%' }}
      >
        {currenciesWithLabel.map((option) => (
          <MenuItem
            key={option.code}
            value={option.code}
            disabled={option.code === fromCurrency}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        value={amount}
        onChange={onAmountChange}
        size="small"
        type="text"
        sx={{ width: '65%' }}
        disabled={disabled}
      />
    </StyledInputRow>
  </StyledInputContainer>
);
