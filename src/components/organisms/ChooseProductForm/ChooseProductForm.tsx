import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Box } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  StyledHeader,
  InputLabel,
} from './ChooseProductForm.styled';

import { SubmitButton } from 'components/atoms';
import { InputField } from 'components/atoms';
import SelectField from 'components/molecules/SelectField/SelectField';
import { EProductFormStepper } from 'enums/EProductFormStepper';
import { useAppDispatch } from 'hooks';
import { setProductStep } from 'store/reducers/ProductStepperSlice';
import { productFormSchema } from 'validation/validationProductFormSchema';

const ChooseProductForm = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const dispatch = useAppDispatch();

  const productOptions = [t('CreateProduct.deposit'), t('CreateProduct.card')];
  const depositOptions = [
    t('CreateProduct.teamDeposit'),
    t('CreateProduct.demandDeposit'),
    t('CreateProduct.savingDeposit'),
    t('CreateProduct.targetDeposit'),
  ];

  const cardOptions = [
    t('CreateProduct.debitCard'),
    t('CreateProduct.creditCard'),
  ];

  const currencyOptions = ['PLN', 'EUR', 'CHF', 'GBP', 'JPY'];

  type formData = {
    product: string;
    subType: string;
    currency: string;
    productName: string;
    productDescription: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<formData>({
    resolver: yupResolver(productFormSchema),
    mode: 'onBlur',
    defaultValues: {
      product: '',
      subType: '',
      currency: '',
      productName: '',
      productDescription: '',
    },
  });

  const selectedProduct = watch('product');

  const onSubmit = (formData: formData) => {
    if (formData.product === 'Deposit') {
      dispatch(setProductStep(EProductFormStepper.DEPOSIT_INFO));
    } else {
      dispatch(setProductStep(EProductFormStepper.CARD_INFO));
    }
  };

  return (
    <MainContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '420px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        data-testid="main-form"
      >
        <StyledHeader>{t('CreateProduct.productHeader')}</StyledHeader>
        <Box>
          <InputLabel>{t('CreateProduct.product')}</InputLabel>
          <SelectField<formData>
            name="product"
            control={control}
            options={productOptions}
            error={errors.product}
          />
        </Box>
        <Box>
          <InputLabel>{t('CreateProduct.subType')}</InputLabel>
          <SelectField<formData>
            name="subType"
            control={control}
            options={
              selectedProduct === t('CreateProduct.deposit')
                ? depositOptions
                : cardOptions
            }
            error={errors.subType}
            disabled={!selectedProduct}
          />
        </Box>
        <Box>
          <InputLabel>{t('CreateProduct.currency')}</InputLabel>
          <SelectField<formData>
            name="currency"
            control={control}
            options={currencyOptions}
            error={errors.currency}
          />
        </Box>
        <Box>
          <InputLabel>{t('CreateProduct.productName')}</InputLabel>
          <InputField
            name="productName"
            id="productName"
            control={control}
            placeholder="Name"
            error={errors.productName}
            helperText={errors.productName?.message}
          />
        </Box>
        <Box>
          <InputLabel>{t('CreateProduct.productDescription')}</InputLabel>
          <Controller
            name="productDescription"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Description"
                multiline
                rows={4}
                error={!!errors.productDescription}
                helperText={errors.productDescription?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>
        <SubmitButton
          buttonContent={t('CreateProduct.buttonContent')}
          isDisabled={!isValid}
        />
      </form>
    </MainContainer>
  );
};

export default ChooseProductForm;
