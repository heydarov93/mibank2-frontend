import { Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BackOfficeWarningWindow } from '../BackOfficeWarningWindow/BackOfficeWarningWindow';

import {
  InformationBox,
  MainContainer,
  SecondaryProductText,
  SecondaryText,
  StyledTitle,
} from './BackOfficeProductWindow.styled';

import { useCreateCardMutation } from 'api/createCardApi';
import { useCreateDepositMutation } from 'api/createDeposit';
import { SecondaryButton, SubmitButton } from 'components/atoms';
import { ProductStatus, ProductType } from 'enums/EProductType';
import { useAppSelector, useAppDispatch } from 'hooks';
import {
  CardFormData,
  DepositFormData,
  ProductFormData,
} from 'models/IProductInfo';
import { resetProductForm } from 'store/reducers/ChooseProductSlice';
import { resetCardData } from 'store/reducers/CreateCardSlice';
import { resetDepositData } from 'store/reducers/CreateDepositSlice';
import { resetProductStep } from 'store/reducers/ProductStepperSlice';
import { getProductForm } from 'store/selectors/ChooseProductSelector';
import { theme } from 'theme/theme';

interface BackOfficeProductWindowProps {
  productTypeData: ProductFormData;
  depositData: DepositFormData;
  cardData: CardFormData;
  onProductCreated: () => void;
}

const formatKey = (key: string): string =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (str) => str.toUpperCase());

const formatValue = (value: string): string => {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return value.toString();
};

const renderInformation = (
  data: ProductFormData | CardFormData | DepositFormData,
) => {
  return Object.entries(data).map(([key, value]) => (
    <InformationBox key={key}>
      <SecondaryText>{formatKey(key)}</SecondaryText>
      <SecondaryProductText>{formatValue(value)}</SecondaryProductText>
    </InformationBox>
  ));
};

const BackOfficeProductWindow: React.FC<BackOfficeProductWindowProps> = ({
  productTypeData,
  depositData,
  cardData,
  onProductCreated,
}) => {
  const { t } = useTranslation('translation');
  const productFormType = useAppSelector(getProductForm);
  const dispatch = useAppDispatch();
  const productData =
    productFormType.productType === ProductType.DEPOSIT
      ? depositData
      : cardData;

  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);
  const [
    createDeposit,
    { isLoading: isDepositLoading, isError: isDepositError },
  ] = useCreateDepositMutation();
  const [createCard, { isLoading: isCardLoading, isError: isCardError }] =
    useCreateCardMutation();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isLoading = isDepositLoading || isCardLoading;
  const isError = isDepositError || isCardError;

  const handleWindowClick = () => setIsWindowOpen((prev) => !prev);

  const backendDepositInfo = Object.fromEntries(
    Object.entries(productData).map(([key, value]) => {
      return [key, value === undefined ? 0 : value];
    }),
  );
  const depositObject = {
    name: productFormType.name,
    description: productFormType.description,
    currency: productFormType.currency,
    type: productFormType.subtype,
    ...backendDepositInfo,
  };

  const cardObject = {
    cardName: productFormType.name,
    cardCurrency: productFormType.currency,
    cardType: productFormType.subtype,
    cardStatus: ProductStatus.ACTIVE,
    ...productData,
  };

  const handleReset = () => {
    handleWindowClick();
    dispatch(resetProductForm());
    dispatch(resetCardData());
    dispatch(resetDepositData());
    dispatch(resetProductStep());
  };

  const handleSubmit = async () => {
    try {
      if (productFormType.productType === ProductType.DEPOSIT) {
        await createDeposit(depositObject).unwrap();
      } else {
        await createCard(cardObject).unwrap();
      }
      handleReset();
      onProductCreated();
    } catch (e) {
      setErrorMessage(
        e instanceof Error ? e.message : t('GeneralErrors.errorCommon'),
      );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <StyledTitle>
        {t('BackOffice.LastResortDeposit.confirmInformation')}
      </StyledTitle>
      <MainContainer>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {renderInformation(productTypeData)}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {renderInformation(productData)}
        </Box>
      </MainContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isLoading && <CircularProgress />}
      </Box>
      {isError && (
        <Box sx={{ color: theme.palette.error.main, textAlign: 'center' }}>
          {errorMessage}
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '24px' }}>
        <SecondaryButton buttonContent="Cancel" onClick={handleWindowClick} />
        <SubmitButton buttonContent="Create" onClick={handleSubmit} />
      </Box>
      {isWindowOpen && (
        <BackOfficeWarningWindow
          title={t('BackOffice.warningWindow.cancelProduct')}
          text={t('BackOffice.warningWindow.cancelProductText')}
          onCancelClick={() => setIsWindowOpen(false)}
          onDeleteClick={handleReset}
        />
      )}
    </Box>
  );
};

export default BackOfficeProductWindow;
