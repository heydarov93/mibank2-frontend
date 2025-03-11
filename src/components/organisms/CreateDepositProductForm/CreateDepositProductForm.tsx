import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Typography,
  Checkbox,
  useTheme,
  FormControlLabel,
} from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CancelButton } from '../OneTimePasscodeForm/OneTimePasscodeForm.styled';

import { BackArrow, InputField } from 'components/atoms';
import { StyledButton } from 'components/atoms/SubmitButton/SubmitButton.styled';
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
      min: undefined,
      max: undefined,
      term: undefined,
      interestRate: undefined,
      capitalization: undefined,
      earlyWithdrawal: false,
      earlyWithdrawalLimit: undefined,
      withdrawalFee: undefined,
      autoRenewable: false,
      augmentable: false,
    },
  });

  const earlyWithdrawalEnabled = watch('earlyWithdrawal');

  const onSubmit = (formData: DepositFormData) => {
    dispatch(setDepositData(formData));
    dispatch(setProductStep(EProductFormStepper.FINISHED));
  };

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
            <InputField
              name="min"
              control={control}
              id="minimumDepositSum"
              placeholder={t('LastResortDeposit.enterHere')}
              error={errors.min}
              helperText={errors.min?.message || ''}
            />
          </Box>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.maximumDepositSum')}
            </Typography>
            <InputField
              name="max"
              id="maximumDepositSum"
              control={control}
              placeholder={t('LastResortDeposit.enterHere')}
              error={errors.max}
            />
          </Box>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.depositTerm')}
            </Typography>
            <InputField
              name="term"
              id="depositTerm"
              control={control}
              placeholder={t('LastResortDeposit.enterHere')}
              error={errors.term}
            />
          </Box>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.depositInterestRate')}
            </Typography>
            <InputField
              name="interestRate"
              id="depositInterestRate"
              control={control}
              placeholder={t('LastResortDeposit.enterHere')}
              error={errors.interestRate}
            />
          </Box>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.depositCapitalizationRate')}
            </Typography>
            <InputField
              name="capitalization"
              id="depositCapitalizationRate"
              control={control}
              placeholder={t('LastResortDeposit.enterHere')}
              error={errors.capitalization}
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
            <InputField
              name="earlyWithdrawalLimit"
              id="earlyWithdrawalLimit"
              control={control}
              placeholder={t('LastResortDeposit.enterHere')}
              error={errors.earlyWithdrawalLimit}
              disabled={!earlyWithdrawalEnabled}
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
              <InputField
                name="withdrawalFee"
                id="withdrawalFee"
                control={control}
                placeholder={t('LastResortDeposit.enterHere')}
                error={errors.withdrawalFee}
                disabled={!earlyWithdrawalEnabled}
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
