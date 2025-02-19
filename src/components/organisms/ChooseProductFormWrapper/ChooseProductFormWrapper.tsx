import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import ChooseProductForm from '../ChooseProductForm/ChooseProductForm';
import CreateCardProductForm from '../CreateCardProductForm/CreateCardProductForm';
import CreateDepositProductForm from '../CreateDepositProductForm/CreateDepositProductForm';

import { EProductFormStepper } from 'enums/EProductFormStepper';
import { getProductStep } from 'store/selectors/ProductStepperSelector';

const ChooseProductFormWrapper = () => {
  const productStep = useSelector(getProductStep);

  const renderFormStep = () => {
    switch (productStep) {
      case EProductFormStepper.PRODUCT_INFO:
        return <ChooseProductForm />;
      case EProductFormStepper.DEPOSIT_INFO:
        return <CreateDepositProductForm />;
      case EProductFormStepper.CARD_INFO:
        return <CreateCardProductForm />;
      case EProductFormStepper.FINISHED:
        //TODO: Add a full form with form data which was submitted in previous steps
        return <div>Finished</div>;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {renderFormStep()}
    </Box>
  );
};

export default ChooseProductFormWrapper;
