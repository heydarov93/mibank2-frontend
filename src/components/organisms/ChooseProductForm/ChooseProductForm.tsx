import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  StyledHeader,
  InputLabel,
} from './ChooseProductForm.styled';

import { SubmitButton } from 'components/atoms';
import { InputField } from 'components/atoms';
import { SelectField } from 'components/molecules';
import { SUPPORTED_CURRENCIES } from 'constants/data/currencies';
import { EProductFormStepper } from 'enums/EProductFormStepper';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setProductForm } from 'store/reducers/ChooseProductSlice';
import { setProductStep } from 'store/reducers/ProductStepperSlice';
import { getProductForm } from 'store/selectors/ChooseProductSelector';
import { chooseProductSchema, TChooseProductValues } from 'validation';

const currencyOptions = SUPPORTED_CURRENCIES.map((value) => ({ value }));

const ChooseProductForm = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const dispatch = useAppDispatch();
  const selector = useAppSelector(getProductForm) || {
    productType: '',
    subtype: '',
    currency: '',
    name: '',
    description: '',
  };

  const productOptions = [
    t('CreateProduct.deposit'),
    t('CreateProduct.card'),
  ].map((value) => ({ value }));
  const depositOptions = [
    t('CreateProduct.teamDeposit'),
    t('CreateProduct.demandDeposit'),
    t('CreateProduct.savingDeposit'),
    t('CreateProduct.targetDeposit'),
  ].map((value) => ({ value }));

  const cardOptions = [
    t('CreateProduct.debitCard'),
    t('CreateProduct.creditCard'),
  ].map((value) => ({ value }));

  type formData = {
    productType: string;
    subtype: string;
    currency: string;
    name: string;
    description: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<TChooseProductValues>({
    resolver: yupResolver(chooseProductSchema),
    mode: 'onBlur',
    defaultValues: {
      productType: selector.productType,
      subtype: selector.subtype,
      currency: selector.currency,
      name: selector.name,
      description: selector.description,
    },
  });

  const selectedProduct = watch('productType');

  const onSubmit = (formData: formData) => {
    if (formData.productType === 'Deposit') {
      dispatch(setProductStep(EProductFormStepper.DEPOSIT_INFO));
    } else {
      dispatch(setProductStep(EProductFormStepper.CARD_INFO));
    }
    dispatch(setProductForm(formData));
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
            name="productType"
            control={control}
            options={productOptions}
            error={errors.productType}
            placeholder={t('CreateProduct.chooseHere')}
          />
        </Box>
        <Box>
          <InputLabel>{t('CreateProduct.subType')}</InputLabel>
          <SelectField<formData>
            name="subtype"
            control={control}
            options={
              selectedProduct === t('CreateProduct.deposit')
                ? depositOptions
                : cardOptions
            }
            error={errors.subtype}
            placeholder={t('CreateProduct.chooseHere')}
            disabled={!selectedProduct}
          />
        </Box>
        <Box>
          <InputLabel>{t('CreateProduct.currency')}</InputLabel>
          <SelectField<formData>
            name="currency"
            control={control}
            options={[...currencyOptions]}
            error={errors.currency}
            placeholder={t('CreateProduct.chooseHere')}
          />
        </Box>
        <Box>
          <InputLabel>{t('CreateProduct.productName')}</InputLabel>
          <InputField
            name="name"
            id="productName"
            control={control}
            placeholder={t('CreateProduct.enterHere')}
            error={errors.name}
            helperText={errors.name?.message}
          />
        </Box>
        <Box>
          <InputLabel>{t('CreateProduct.productDescription')}</InputLabel>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
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
