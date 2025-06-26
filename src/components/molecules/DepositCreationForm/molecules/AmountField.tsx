import { Box, InputAdornment, TextField } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledLabel } from '../DepositCreationForm.styled';
import { CurrencyBox } from '../atoms/CurrencyBox';

import { DepositFormValues } from 'models/IDepositInfo';
import { TCurrency } from 'types/card';

interface AmountFieldProps {
  control: Control<DepositFormValues>;
  errors: FieldErrors<DepositFormValues>;
  currency: TCurrency;
}

const AmountField = ({ control, errors, currency }: AmountFieldProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
  return (
    <Box marginBottom={3}>
      <StyledLabel>{t('depositAmountLabel')}</StyledLabel>
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            data-testid="deposit-amount"
            fullWidth
            type="number"
            value={field.value ?? ''}
            inputProps={{ min: 0, pattern: 'd*' }}
            placeholder={t('depositAmountPlaceholder')}
            onBlur={field.onBlur}
            onChange={(e) => field.onChange(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CurrencyBox currency={currency} />
                </InputAdornment>
              ),
            }}
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
        )}
      />
    </Box>
  );
};

export default AmountField;
