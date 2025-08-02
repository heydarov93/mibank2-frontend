import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  InformationBox,
  MainContainer,
  SecondaryProductText,
  SecondaryText,
  StyledTitle,
} from './ProductWindow.styled';

import { useCreateCardMutation } from 'api/services/card-service/cards.api';
import { TCardStatus } from 'api/services/card-service/cards.types';
import { useCreateDepositMutation } from 'api/services/deposit-service/deposits.api';
import { SecondaryButton, SubmitButton } from 'components/atoms';
import { WarningWindow } from 'components/molecules';
import { ProductType } from 'enums/EProductType';
import { useAppDispatch, useAppSelector } from 'hooks';
import { ICreateCardFormData } from 'models/ICard';
import { IDepositFormData } from 'models/IDeposit';
import { IProductFormData } from 'models/IProduct';
import { resetCardData } from 'store/slices/cards/CreateCardSlice';
import { resetDepositData } from 'store/slices/deposits/CreateDepositSlice';
import { getProductForm } from 'store/slices/products/ChooseProductSelector';
import { resetProductForm } from 'store/slices/products/ChooseProductSlice';
import { resetProductStep } from 'store/slices/products/ProductStepperSlice';
import { theme } from 'theme/theme';
import { TCardIssuer, TCardIssueType, TCardType, TCurrency } from 'types/types';

interface ProductWindowProps {
  productTypeData: IProductFormData;
  depositData: IDepositFormData;
  cardData: ICreateCardFormData;
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
  data: IProductFormData | ICreateCardFormData | IDepositFormData,
) => {
  return Object.entries(data).map(([key, value]) => (
    <InformationBox key={key}>
      <SecondaryText>{formatKey(key)}</SecondaryText>
      <SecondaryProductText>{formatValue(value)}</SecondaryProductText>
    </InformationBox>
  ));
};

export const ProductWindow: React.FC<ProductWindowProps> = ({
  productTypeData,
  depositData,
  cardData,
  onProductCreated,
}: ProductWindowProps) => {
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

  const depositPayload = {
    name: productFormType.name,
    description: productFormType.description,
    currency: productFormType.currency,
    type: productFormType.subtype,
    min: backendDepositInfo.min ?? 0,
    max: backendDepositInfo.max ?? 0,
    term: backendDepositInfo.term ?? 0,
    interestRate: backendDepositInfo.interestRate ?? 0,
    capitalization: backendDepositInfo.capitalization ?? false,
    replenishment: backendDepositInfo.replenishment ?? false,
    withdrawal: backendDepositInfo.withdrawal ?? false,
    partialWithdrawal: backendDepositInfo.partialWithdrawal ?? false,
    earlyClosure: backendDepositInfo.earlyClosure ?? false,
    autoRenewal: backendDepositInfo.autoRenewal ?? false,
    earlyWithdrawalLimit: backendDepositInfo.earlyWithdrawalLimit ?? 0,
    earlyWithdrawalFee: backendDepositInfo.earlyWithdrawalFee ?? 0,
    earlyWithdrawal: backendDepositInfo.earlyWithdrawal ?? false,
    augmentable: backendDepositInfo.augmentable ?? false,
    autoRenewable: backendDepositInfo.autoRenewable ?? false,
  };

  const cardPayload = {
    cardName: productFormType.name,
    cardCurrency: productFormType.currency as TCurrency,
    cardType: productFormType.subtype as TCardType,
    cashbackRate: (productData as ICreateCardFormData).cashbackRate as number,
    dailyLimit: (productData as ICreateCardFormData).dailyOperationalLimit as number,
    issueType: (productData as ICreateCardFormData).cardType as TCardIssueType,
    cardIssuer: (productData as ICreateCardFormData).cardIssuer as TCardIssuer,
    issueFee: (productData as ICreateCardFormData).monthlyFee as number,
    foreignTransactionLimit: (productData as ICreateCardFormData)
      .foreignTransactionLimit as number,
    monthlyFee: (productData as ICreateCardFormData).monthlyFee as number,
    cardStatus: 'ACTIVE' as TCardStatus,
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
        await createDeposit(depositPayload).unwrap();
      } else {
        await createCard(cardPayload).unwrap();
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
        <WarningWindow
          title={t('BackOffice.warningWindow.cancelProduct')}
          text={t('BackOffice.warningWindow.cancelProductText')}
          onCancelClick={() => setIsWindowOpen(false)}
          onDeleteClick={handleReset}
        />
      )}
    </Box>
  );
};
