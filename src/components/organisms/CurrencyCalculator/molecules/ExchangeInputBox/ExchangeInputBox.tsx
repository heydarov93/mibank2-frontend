import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';

import {
  StyledInputContainer,
  StyledInputLabel,
  StyledInputRow,
} from './ExchangeInputBox.styled';

import { CurrencySelect, NumericInput } from 'components/molecules';

interface ExchangeInputBoxProps {
  label: string;
  fromCurrency?: string;
  toCurrency?: string;
  amount: string;
  onCurrencyChange: (currency: string) => void;
  onAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const ExchangeInputBox = ({
  label,
  fromCurrency,
  toCurrency,
  amount,
  onCurrencyChange,
  onAmountChange,
  disabled,
}: ExchangeInputBoxProps) => {
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
          inputProps={{ sx: { textAlign: 'right' }, fixedDecimalScale: false }}
          InputProps={{
            sx: { borderRadius: '8px', fontFamily: 'Inter', fontWeight: 500 },
            inputComponent: NumericInput as never,
          }}
          disabled={disabled}
        />
      </StyledInputRow>
    </StyledInputContainer>
  );
};
