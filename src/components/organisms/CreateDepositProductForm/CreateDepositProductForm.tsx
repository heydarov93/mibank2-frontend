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
import { useAppDispatch } from 'hooks';
import { setProductStep } from 'store/reducers/ProductStepperSlice';
import { lastDepositValidation } from 'validation/lastResortDepositValidation';

const CreateDepositProductForm: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const dispatch = useAppDispatch();

  const {
    control,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
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
      withdrawalFee: undefined,
      autoRenewable: false,
      addOn: false,
    },
  });

  const earlyWithdrawalEnabled = watch('earlyWithdrawal');

  const onSubmit = () => {
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
        onBackClick={() =>
          dispatch(setProductStep(EProductFormStepper.PRODUCT_INFO))
        }
      />
      <Typography textAlign={'center'} fontSize={32} mb={3} fontWeight={'bold'}>
        “{t('LastResortDeposit.lastResortDeposit')}”
      </Typography>
      <form style={{ width: '420px' }} onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={4}>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.minimumDepositSum')}
            </Typography>
            <InputField
              name="minimumDepositSum"
              control={control}
              id="minimumDepositSum"
              placeholder={t('LastResortDeposit.enterHere')}
              error={errors.minimumDepositSum}
              helperText={errors.minimumDepositSum?.message || ''}
            />
          </Box>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.maximumDepositSum')}
            </Typography>
            <InputField
              name="maximumDepositSum"
              id="maximumDepositSum"
              control={control}
              placeholder={t('LastResortDeposit.enterHere')}
              error={errors.maximumDepositSum}
            />
          </Box>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.depositTerm')}
            </Typography>
            <InputField
              name="depositTerm"
              id="depositTerm"
              control={control}
              placeholder={t('LastResortDeposit.enterHere')}
              error={errors.depositTerm}
            />
          </Box>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.depositInterestRate')}
            </Typography>
            <InputField
              name="depositInterestRate"
              id="depositInterestRate"
              control={control}
              placeholder={t('LastResortDeposit.enterHere')}
              error={errors.depositInterestRate}
            />
          </Box>
          <Box>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('LastResortDeposit.depositCapitalizationRate')}
            </Typography>
            <InputField
              name="depositCapitalizationRate"
              id="depositCapitalizationRate"
              control={control}
              placeholder={t('LastResortDeposit.enterHere')}
              error={errors.depositCapitalizationRate}
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
              name="addOn"
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
