import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CancelButton } from '../OneTimePasscodeForm/OneTimePasscodeForm.styled';

import { InputField } from 'components/atoms';
import { StyledButton } from 'components/atoms/SubmitButton/SubmitButton.styled';
import MiAutoComplete from 'components/molecules/MiAutoComplete/MiAutoComplete';
import { productCardValidation } from 'validation/productCardValidation';

interface FormData {
  cashbackRate: number;
  monthlyFee: number;
  dailyOperationalLimit: number;
  foreignTransactionLimit: number;
  cardIssuer: string;
  cardType: string;
}

const CreateCardProductForm: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  const cardIssuerOptions = [t('VisaCard.visa'), t('VisaCard.masterCard')];
  const cardTypeOptions = [t('VisaCard.digital'), t('VisaCard.plastic')];

  const {
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(productCardValidation),
    mode: 'all',
    defaultValues: {
      cashbackRate: undefined,
      monthlyFee: undefined,
      dailyOperationalLimit: undefined,
      foreignTransactionLimit: undefined,
      cardIssuer: '',
      cardType: '',
    },
  });

  return (
    <Box
      width="75%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      height="auto"
      padding={5}
    >
      <Typography textAlign="center" fontSize={32} mb={3} fontWeight="bold">
        {t('VisaCard.visaElectronCard')}
      </Typography>
      <form style={{ width: '420px' }}>
        <Box display="flex" flexDirection="column" gap={4}>
          <Box>
            <Typography fontWeight="bold" fontSize={14}>
              {t('VisaCard.cardIssuer')}
            </Typography>
            <Controller
              name="cardIssuer"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MiAutoComplete
                  options={cardIssuerOptions}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  error={!!error}
                  helperText={error ? error.message : ''}
                />
              )}
            />
          </Box>
          <Box>
            <Typography fontWeight="bold" fontSize={14}>
              {t('VisaCard.cardType')}
            </Typography>
            <Controller
              name="cardType"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MiAutoComplete
                  options={cardTypeOptions}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  error={!!error}
                  helperText={error ? error.message : ''}
                />
              )}
            />
          </Box>
          <Box>
            <Typography fontWeight="bold" fontSize={14}>
              {t('VisaCard.cashbackRate')}
            </Typography>
            <InputField
              name="cashbackRate"
              control={control}
              id="cashbackRate"
              placeholder={t('VisaCard.enterHere')}
              error={errors.cashbackRate}
              helperText={errors.cashbackRate?.message || ''}
            />
          </Box>
          <Box>
            <Typography fontWeight="bold" fontSize={14}>
              {t('VisaCard.monthlyFee')}
            </Typography>
            <InputField
              name="monthlyFee"
              control={control}
              id="monthlyFee"
              placeholder={t('VisaCard.enterHere')}
              error={errors.monthlyFee}
              helperText={errors.monthlyFee?.message || ''}
            />
          </Box>
          <Box>
            <Typography fontWeight="bold" fontSize={14}>
              {t('VisaCard.dailyOperationalLimit')}
            </Typography>
            <InputField
              name="dailyOperationalLimit"
              control={control}
              id="dailyOperationalLimit"
              placeholder={t('VisaCard.enterHere')}
              error={errors.dailyOperationalLimit}
              helperText={errors.dailyOperationalLimit?.message || ''}
            />
          </Box>
          <Box>
            <Typography fontWeight="bold" fontSize={14}>
              {t('VisaCard.foreignTransactionLimit')}
            </Typography>
            <InputField
              name="foreignTransactionLimit"
              control={control}
              id="foreignTransactionLimit"
              placeholder={t('VisaCard.enterHere')}
              error={errors.foreignTransactionLimit}
              helperText={errors.foreignTransactionLimit?.message || ''}
            />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="end" gap={4}>
            <CancelButton>{t('VisaCard.cancel')}</CancelButton>
            <StyledButton
              type="submit"
              disabled={!isValid}
              variant="contained"
              color="primary"
              size="large"
            >
              {t('VisaCard.create')}
            </StyledButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCardProductForm;
