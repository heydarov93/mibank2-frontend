import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledCheckBox,
  StyledInputField,
  StyledInputLabel,
} from './SavePaymentWrapper.styled';

import { savePaymentSchema } from 'validation';

export const SavePaymentWrapper = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });
  const [isSavePaymentChecked, setIsSavePaymentChecked] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(savePaymentSchema(t)),
    defaultValues: { paymentName: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  return (
    <>
      <StyledCheckBox>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSavePaymentChecked}
              onChange={(e) => setIsSavePaymentChecked(e.target.checked)}
            />
          }
          label={t('transferModal.saveToPaymentLabel')}
        />
      </StyledCheckBox>

      {isSavePaymentChecked && (
        <Box sx={{ marginTop: '16px' }}>
          <StyledInputLabel>
            {t('transferModal.paymentNameLabel')}
          </StyledInputLabel>
          <Controller
            name="paymentName"
            control={control}
            render={({ field }) => (
              <StyledInputField
                {...field}
                fullWidth
                variant="outlined"
                type="string"
                size="small"
                placeholder={t('transferModal.paymentInputPlaceholder')}
                error={!!errors.paymentName}
                helperText={errors.paymentName?.message}
              />
            )}
          />
        </Box>
      )}
    </>
  );
};
