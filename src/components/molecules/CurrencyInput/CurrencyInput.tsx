import { SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

import { CurrencySelect } from '../CurrencySelect/CurrencySelect';

import {
  StyledInputContainer,
  StyledInputLabel,
  StyledInputRow,
} from './CurrencyInput.styled';

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
}: CurrencyInputProps) => {
  function handleCurrencySelectChange(e: SelectChangeEvent<unknown>) {
    onCurrencyChange(e.target.value as string);
  }

  return (
    <StyledInputContainer>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledInputRow>
        <CurrencySelect
          value={toCurrency}
          onChange={handleCurrencySelectChange}
          disabledOptions={[fromCurrency ?? '']}
        />
        <TextField
          value={amount}
          onChange={onAmountChange}
          size="small"
          type="text"
          sx={{ width: '60%' }}
          inputProps={{ sx: { textAlign: 'right' } }}
          InputProps={{ sx: { borderRadius: '8px' } }}
          disabled={disabled}
        />
      </StyledInputRow>
    </StyledInputContainer>
  );
};
