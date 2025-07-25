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

import { ConfirmationWindow } from 'components/molecules';
import { EProductFormStepper } from 'enums/EProductFormStepper';
import { getCardFormData } from 'store/slices/cards/CreateCardSelector';
import { getDepositForm } from 'store/slices/deposits/CreateDepositSelector';
import { getProductForm } from 'store/slices/products/ChooseProductSelector';
import { getProductStep } from 'store/slices/products/ProductStepperSelector';

export const ChooseProductFormWrapper = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false);

  const productStep = useSelector(getProductStep);
  const productTypeData = useSelector(getProductForm);
  const creditTypeData = useSelector(getCardFormData);
  const depositTypeData = useSelector(getDepositForm);

  const handleProductCreation = () => {
    setIsProductCreated(true);
  };
  const handleProductCancel = () => {
    setIsProductCreated(false);
  };

  const renderFormStep = () => {
    switch (productStep) {
      case EProductFormStepper.PRODUCT_INFO:
        return <ChooseProductForm />;
      case EProductFormStepper.DEPOSIT_INFO:
        return <CreateDepositProductForm />;
      case EProductFormStepper.CARD_INFO:
        return <CreateCardProductForm />;
      case EProductFormStepper.FINISHED:
        return (
          <ProductWindow
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
      </Box>
    </>
  );
};
