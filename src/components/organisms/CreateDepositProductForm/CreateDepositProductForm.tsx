import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Typography,
  Checkbox,
  useTheme,
  FormControlLabel,
} from '@mui/material';
import React from 'react';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CancelButton } from '../OneTimePasscodeForm/OneTimePasscodeForm.styled';

import { BackArrow } from 'components/atoms';
import { StyledButton } from 'components/atoms/SubmitButton/SubmitButton.styled';
import { InputFieldControlled, NumericInput } from 'components/molecules';
import { EProductFormStepper } from 'enums/EProductFormStepper';
import { useAppDispatch, useAppSelector } from 'hooks';
import { DepositFormData } from 'models/IProductInfo';
import { setDepositData } from 'store/reducers/CreateDepositSlice';
import { setProductStep } from 'store/reducers/ProductStepperSlice';
import { getProductForm } from 'store/selectors/ChooseProductSelector';
import { lastDepositValidation } from 'validation/lastResortDepositValidation';

const CreateDepositProductForm: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const dispatch = useAppDispatch();
  const selector = useAppSelector(getProductForm);

  const {
    control,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<DepositFormData>({
    resolver: yupResolver(lastDepositValidation),
    mode: 'all',
    defaultValues: {
      minimumDepositSum: undefined,
      maximumDepositSum: undefined,
      depositTerm: undefined,
      depositInterestRate: undefined,
      depositCapitalizationRate: undefined,
      earlyWithdrawal: false,
      earlyWithdrawalLimit: undefined,
      earlyWithdrawalFee: undefined,
      autoRenewable: false,
      augmentable: false,
    },
  });

  const earlyWithdrawalEnabled = watch('earlyWithdrawal');

  const onSubmit = (formData: DepositFormData) => {
    dispatch(setDepositData(formData));
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
      minHeight={'100vh'}
      height={'auto'}
      padding={5}
      position="relative"
    >
      <BackArrow
        onBackClick={() => {
          dispatch(setProductStep(EProductFormStepper.PRODUCT_INFO));
        }}
      />
      <Typography textAlign={'center'} fontSize={32} mb={3} fontWeight={'bold'}>
        &quot;{selector.name}&quot; Deposit
      </Typography>
      <form style={{ width: '420px' }} onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={4}>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.minimumDepositSum')}
            </Typography>
            <InputFieldControlled
              name="minimumDepositSum"
              control={control}
              textFieldProps={{
                error: !!errors.minimumDepositSum,
                helperText: errorMessage(errors.minimumDepositSum),
                placeholder: t('LastResortDeposit.enterHere'),
                InputProps: {
                  inputComponent: NumericInput as never,
                },
              }}
            />
          </Box>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.maximumDepositSum')}
            </Typography>
            <InputFieldControlled
              name="maximumDepositSum"
              control={control}
              textFieldProps={{
                error: !!errors.maximumDepositSum,
                helperText: errorMessage(errors.maximumDepositSum),
                placeholder: t('LastResortDeposit.enterHere'),
                InputProps: {
                  inputComponent: NumericInput as never,
                },
              }}
            />
          </Box>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.depositTerm')}
            </Typography>
            <InputFieldControlled
              name="depositTerm"
              control={control}
              textFieldProps={{
                error: !!errors.depositTerm,
                helperText: errorMessage(errors.depositTerm),
                placeholder: t('LastResortDeposit.enterHere'),
                InputProps: {
                  inputComponent: NumericInput as never,
                },
                inputProps: { decimalScale: 0 },
              }}
            />
          </Box>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.depositInterestRate')}
            </Typography>
            <InputFieldControlled
              name="depositInterestRate"
              control={control}
              textFieldProps={{
                error: !!errors.depositInterestRate,
                helperText: errorMessage(errors.depositInterestRate),
                placeholder: t('LastResortDeposit.enterHere'),
                InputProps: {
                  inputComponent: NumericInput as never,
                },
              }}
            />
          </Box>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.depositCapitalizationRate')}
            </Typography>
            <InputFieldControlled
              name="depositCapitalizationRate"
              control={control}
              textFieldProps={{
                error: !!errors.depositCapitalizationRate,
                helperText: errorMessage(errors.depositCapitalizationRate),
                placeholder: t('LastResortDeposit.enterHere'),
                InputProps: {
                  inputComponent: NumericInput as never,
                },
              }}
            />
            <Box display={'flex'} alignItems={'center'} justifyContent={'end'}>
              <Controller
                name="earlyWithdrawal"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label={t('LastResortDeposit.earlyWithdrawal')}
                  />
                )}
              />
            </Box>
          </Box>
          <Box
            color={
              earlyWithdrawalEnabled
                ? theme.palette.common.black
                : theme.palette.grey[300]
            }
          >
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.earlyWithdrawalLimit')}
            </Typography>
            <InputFieldControlled
              name="earlyWithdrawalLimit"
              control={control}
              textFieldProps={{
                error: !!errors.earlyWithdrawalLimit,
                helperText: errorMessage(errors.earlyWithdrawalLimit),
                placeholder: t('LastResortDeposit.enterHere'),
                disabled: !earlyWithdrawalEnabled,
                InputProps: {
                  inputComponent: NumericInput as never,
                },
              }}
            />
          </Box>
          <Box>
            <Box
              color={
                earlyWithdrawalEnabled
                  ? theme.palette.common.black
                  : theme.palette.grey[300]
              }
            >
              <Typography fontWeight={'bold'} fontSize={14}>
                {t('LastResortDeposit.withdrawalFee')}
              </Typography>
              <InputFieldControlled
                name="earlyWithdrawalFee"
                control={control}
                textFieldProps={{
                  error: !!errors.earlyWithdrawalFee,
                  helperText: errorMessage(errors.earlyWithdrawalFee),
                  placeholder: t('LastResortDeposit.enterHere'),
                  disabled: !earlyWithdrawalEnabled,
                  InputProps: {
                    inputComponent: NumericInput as never,
                  },
                }}
              />
            </Box>
          </Box>
          <Box display={'flex'} gap={4}>
            <Controller
              name="autoRenewable"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label={t('LastResortDeposit.autoRenewable')}
                />
              )}
            />
            <Controller
              name="augmentable"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label={t('LastResortDeposit.addOn')}
                />
              )}
            />
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'end'}
            gap={4}
          >
            <CancelButton>{t('LastResortDeposit.cancel')}</CancelButton>
            <StyledButton
              type="submit"
              disabled={!isValid}
              variant="contained"
              color="primary"
              size="large"
            >
              {t('LastResortDeposit.create')}
            </StyledButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CreateDepositProductForm;
