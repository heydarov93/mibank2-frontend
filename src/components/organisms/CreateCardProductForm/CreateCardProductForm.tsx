import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CancelButton } from '../OneTimePasscodeForm/OneTimePasscodeForm.styled';

import { BackArrow, FieldLabel } from 'components/atoms';
import { StyledButton } from 'components/atoms/SubmitButton/SubmitButton.styled';
import { NumericFieldControlled } from 'components/molecules';
import MiAutoComplete from 'components/molecules/MiAutoComplete/MiAutoComplete';
import {
  CARD_ISSUER_OPTIONS,
  CARD_TYPE_OPTIONS,
} from 'constants/business/card';
import { EProductFormStepper } from 'enums/EProductFormStepper';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setCardFormData } from 'store/slices/cards/CreateCardSlice';
import { getProductForm } from 'store/slices/products/ChooseProductSelector';
import { setProductStep } from 'store/slices/products/ProductStepperSlice';
import { productCardSchema, TProductCardValues } from 'validation';

interface FormData {
  cashbackRate: number;
  monthlyFee: number;
  dailyOperationalLimit: number;
  foreignTransactionLimit: number;
  cardIssuer: string | null;
  cardType: string | null;
}

const CreateCardProductForm: React.FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'BackOffice.VisaCard',
  });
  const dispatch = useAppDispatch();
  const selector = useAppSelector(getProductForm);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TProductCardValues>({
    resolver: yupResolver(productCardSchema),
    mode: 'all',
    defaultValues: {
      cashbackRate: undefined,
      monthlyFee: undefined,
      dailyOperationalLimit: undefined,
      foreignTransactionLimit: undefined,
      cardIssuer: null,
      cardType: null,
    },
  });

  const onSubmit = (formData: FormData) => {
    dispatch(setCardFormData(formData));
    dispatch(setProductStep(EProductFormStepper.FINISHED));
  };

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
      position="relative"
    >
      <BackArrow
        onBackClick={() =>
          dispatch(setProductStep(EProductFormStepper.PRODUCT_INFO))
        }
      />
      <Typography textAlign="center" fontSize={32} mb={3} fontWeight="bold">
        &quot;{selector.name}&quot; Card
      </Typography>
      <form style={{ width: '420px' }} onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={4}>
          <Box>
            <FieldLabel htmlFor="cardIssuer">{t('cardIssuer')}</FieldLabel>
            <Controller
              name="cardIssuer"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MiAutoComplete
                  options={CARD_ISSUER_OPTIONS}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  error={!!error}
                  helperText={error ? error.message : ''}
                />
              )}
            />
          </Box>
          <Box>
            <FieldLabel htmlFor="cardType">{t('cardType')}</FieldLabel>
            <Controller
              name="cardType"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MiAutoComplete
                  options={CARD_TYPE_OPTIONS}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  error={!!error}
                  helperText={error ? error.message : ''}
                />
              )}
            />
          </Box>
          <Box>
            <NumericFieldControlled
              name="cashbackRate"
              label={t('cashbackRate')}
              control={control}
              placeholder={t('enterHere')}
              error={errors.cashbackRate}
            />
          </Box>
          <Box>
            <NumericFieldControlled
              name="monthlyFee"
              label={t('monthlyFee')}
              control={control}
              placeholder={t('enterHere')}
              error={errors.monthlyFee}
            />
          </Box>
          <Box>
            <NumericFieldControlled
              name="dailyOperationalLimit"
              label={t('dailyOperationalLimit')}
              control={control}
              placeholder={t('enterHere')}
              error={errors.dailyOperationalLimit}
            />
          </Box>
          <Box>
            <NumericFieldControlled
              name="foreignTransactionLimit"
              label={t('foreignTransactionLimit')}
              control={control}
              placeholder={t('enterHere')}
              error={errors.foreignTransactionLimit}
            />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="end" gap={4}>
            <CancelButton>{t('cancel')}</CancelButton>
            <StyledButton
              type="submit"
              disabled={!isValid}
              variant="contained"
              color="primary"
              size="large"
            >
              {t('create')}
            </StyledButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCardProductForm;
