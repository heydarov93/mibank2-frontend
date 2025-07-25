import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CancelButton } from '../../../OneTimePasscodeForm/OneTimePasscodeForm.styled';

import { BackArrow } from 'components/atoms';
import { StyledButton } from 'components/atoms/SubmitButton/SubmitButton.styled';
import { NumericFieldController } from 'components/molecules';
import { EProductFormStepper } from 'enums/EProductFormStepper';
import { useAppDispatch, useAppSelector } from 'hooks';
import { DepositFormData } from 'models/IProductInfo';
import { setDepositData } from 'store/slices/deposits/CreateDepositSlice';
import { getProductForm } from 'store/slices/products/ChooseProductSelector';
import { setProductStep } from 'store/slices/products/ProductStepperSlice';
import {
  createDepositProductSchema,
  TCreateDepositProductValues,
} from 'validation';

export const CreateDepositProductForm: React.FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'BackOffice.LastResortDeposit',
  });
  const dispatch = useAppDispatch();
  const selector = useAppSelector(getProductForm);

  const {
    control,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TCreateDepositProductValues>({
    resolver: yupResolver(createDepositProductSchema),
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
            <NumericFieldController
              name="minimumDepositSum"
              label={t('minimumDepositSum')}
              control={control}
              placeholder={t('enterHere')}
              error={errors.minimumDepositSum}
            />
          </Box>
          <Box>
            <NumericFieldController
              name="maximumDepositSum"
              label={t('maximumDepositSum')}
              control={control}
              placeholder={t('enterHere')}
              error={errors.maximumDepositSum}
            />
          </Box>
          <Box>
            <NumericFieldController
              name="depositTerm"
              label={t('depositTerm')}
              control={control}
              placeholder={t('enterHere')}
              error={errors.depositTerm}
              decimalScale={0}
            />
          </Box>
          <Box>
            <NumericFieldController
              name="depositInterestRate"
              label={t('depositInterestRate')}
              control={control}
              placeholder={t('enterHere')}
              error={errors.depositInterestRate}
            />
          </Box>
          <Box>
            <NumericFieldController
              name="depositCapitalizationRate"
              label={t('depositCapitalizationRate')}
              control={control}
              placeholder={t('enterHere')}
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
                    label={t('earlyWithdrawal')}
                  />
                )}
              />
            </Box>
          </Box>
          <Box>
            <NumericFieldController
              name="earlyWithdrawalLimit"
              label={t('earlyWithdrawalLimit')}
              control={control}
              placeholder={t('enterHere')}
              error={errors.earlyWithdrawalLimit}
              disabled={!earlyWithdrawalEnabled}
            />
          </Box>
          <Box>
            <NumericFieldController
              name="earlyWithdrawalFee"
              label={t('withdrawalFee')}
              control={control}
              placeholder={t('enterHere')}
              error={errors.earlyWithdrawalFee}
              disabled={!earlyWithdrawalEnabled}
            />
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
                  label={t('autoRenewable')}
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
                  label={t('addOn')}
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
