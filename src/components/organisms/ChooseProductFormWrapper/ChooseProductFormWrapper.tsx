import Box from '@mui/material/Box';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  ChooseProductForm,
  CreateCardProductForm,
  CreateDepositProductForm,
  ProductWindow,
} from './molecules';

import { ConfirmationWindow, WarningWindow } from 'components/molecules';
import { EProductFormStepper } from 'enums/EProductFormStepper';
import { useAppDispatch, useDisclosure } from 'hooks';
import { resetCardData } from 'store/slices/cards';
import { getCardFormData } from 'store/slices/cards/CreateCardSelector';
import { resetDepositData } from 'store/slices/deposits';
import { getDepositForm } from 'store/slices/deposits/CreateDepositSelector';
import { resetProductForm, resetProductStep } from 'store/slices/products';
import { getProductForm } from 'store/slices/products/ChooseProductSelector';
import { getProductStep } from 'store/slices/products/ProductStepperSelector';

export const ChooseProductFormWrapper = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const productStep = useSelector(getProductStep);
  const productTypeData = useSelector(getProductForm);
  const creditTypeData = useSelector(getCardFormData);
  const depositTypeData = useSelector(getDepositForm);
  const warningModal = useDisclosure();

  const handleProductCreation = () => {
    setIsProductCreated(true);
  };
  const handleProductCancel = () => {
    setIsProductCreated(false);
  };

  const handleReset = () => {
    warningModal.close();
    dispatch(resetProductForm());
    dispatch(resetCardData());
    dispatch(resetDepositData());
    dispatch(resetProductStep());
  };

  const renderFormStep = () => {
    switch (productStep) {
      case EProductFormStepper.PRODUCT_INFO:
        return <ChooseProductForm />;
      case EProductFormStepper.DEPOSIT_INFO:
        return <CreateDepositProductForm onOpenModal={warningModal.open} />;
      case EProductFormStepper.CARD_INFO:
        return <CreateCardProductForm onOpenModal={warningModal.open} />;
      case EProductFormStepper.FINISHED:
        return (
          <ProductWindow
            onReset={handleReset}
            onOpenModal={warningModal.open}
            productTypeData={productTypeData}
            cardData={creditTypeData}
            depositData={depositTypeData}
            onProductCreated={handleProductCreation}
          />
        );
    }
  };

  return (
    <>
      {isProductCreated && (
        <ConfirmationWindow
          onClose={handleProductCancel}
          sx={{ top: '40px', right: '40px' }}
          title={t('ConfirmationWindow.confirmationTitle')}
          body={t('ConfirmationWindow.secondaryText')}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {renderFormStep()}
        <WarningWindow
          open={warningModal.isOpen}
          title={t('warningWindow.cancelProduct')}
          text={t('warningWindow.cancelProductText')}
          onBackClick={warningModal.close}
          onCancelClick={handleReset}
          deposit={true}
        />
      </Box>
    </>
  );
};
