import { Box, TextField } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledLabel } from '../DepositCreationForm.styled';
import CurrencyBox from '../atoms/CurrencyBox';

import { DepositFormValues } from 'models/IDepositInfo';

interface AmountFieldProps {
  control: Control<DepositFormValues>;
  errors: FieldErrors<DepositFormValues>;
  currency: string;
}

const AmountField = ({ control, errors, currency }: AmountFieldProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });

  return (
    <Box sx={{ marginBottom: '24px' }}>
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
              endAdornment: <CurrencyBox currency={currency} />,
            }}
            error={!!errors.amount}
            helperText={errors.amount?.message}
            sx={{ borderRadius: '8px' }}
          />
        )}
      />
    </Box>
  );
};

export default AmountField;
