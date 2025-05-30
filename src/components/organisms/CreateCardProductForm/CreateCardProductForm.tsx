import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CancelButton } from '../OneTimePasscodeForm/OneTimePasscodeForm.styled';

import { BackArrow } from 'components/atoms';
import { StyledButton } from 'components/atoms/SubmitButton/SubmitButton.styled';
import { InputFieldControlled, NumericInput } from 'components/molecules';
import MiAutoComplete from 'components/molecules/MiAutoComplete/MiAutoComplete';
import { EProductFormStepper } from 'enums/EProductFormStepper';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setCardFormData } from 'store/reducers/CreateCardSlice';
import { setProductStep } from 'store/reducers/ProductStepperSlice';
import { getProductForm } from 'store/selectors/ChooseProductSelector';
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
  const dispatch = useAppDispatch();
  const selector = useAppSelector(getProductForm);

  const cardIssuerOptions = [t('VisaCard.visa'), t('VisaCard.masterCard')];
  const cardTypeOptions = [t('VisaCard.digital'), t('VisaCard.plastic')];

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
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

  const onSubmit = (formData: FormData) => {
    dispatch(setCardFormData(formData));
    dispatch(setProductStep(EProductFormStepper.FINISHED));
  };

  const errorMessage = (error: FieldError | undefined) => error?.message ?? '';

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
            <InputFieldControlled
              name="cashbackRate"
              control={control}
              textFieldProps={{
                error: !!errors.cashbackRate,
                helperText: errorMessage(errors.cashbackRate),
                placeholder: t('VisaCard.enterHere'),
                InputProps: {
                  inputComponent: NumericInput as never,
                },
              }}
            />
          </Box>
          <Box>
            <Typography fontWeight="bold" fontSize={14}>
              {t('VisaCard.monthlyFee')}
            </Typography>
            <InputFieldControlled
              name="monthlyFee"
              control={control}
              textFieldProps={{
                error: !!errors.monthlyFee,
                helperText: errorMessage(errors.monthlyFee),
                placeholder: t('VisaCard.enterHere'),
                InputProps: {
                  inputComponent: NumericInput as never,
                },
              }}
            />
          </Box>
          <Box>
            <Typography fontWeight="bold" fontSize={14}>
              {t('VisaCard.dailyOperationalLimit')}
            </Typography>
            <InputFieldControlled
              name="dailyOperationalLimit"
              control={control}
              textFieldProps={{
                error: !!errors.dailyOperationalLimit,
                helperText: errorMessage(errors.dailyOperationalLimit),
                placeholder: t('VisaCard.enterHere'),
                InputProps: {
                  inputComponent: NumericInput as never,
                },
              }}
            />
          </Box>
          <Box>
            <Typography fontWeight="bold" fontSize={14}>
              {t('VisaCard.foreignTransactionLimit')}
            </Typography>
            <InputFieldControlled
              name="foreignTransactionLimit"
              control={control}
              textFieldProps={{
                error: !!errors.foreignTransactionLimit,
                helperText: errorMessage(errors.foreignTransactionLimit),
                placeholder: t('VisaCard.enterHere'),
                InputProps: {
                  inputComponent: NumericInput as never,
                },
              }}
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
