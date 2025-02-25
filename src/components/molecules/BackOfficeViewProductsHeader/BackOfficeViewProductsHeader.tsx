import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  PrimaryHeader,
  SecondaryHeader,
} from './BackOfficeViewProductsHeader.styled';

import { SubmitButton } from 'components/atoms';
import ButtonPlusIcon from 'components/atoms/ButtonPlusIcon/ButtonPlusIcon';
import { TO_BACK_OFFICE_CREATE_PRODUCT } from 'constants/routesName';

const BackOfficeViewProductsHeader = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <PrimaryHeader>{t('header.finProducts')}</PrimaryHeader>
        <SecondaryHeader>{t('header.viewProducts')}</SecondaryHeader>
      </Box>
      <SubmitButton
        buttonContent="Create Product"
        startIcon={<ButtonPlusIcon />}
        onClick={() => {
          navigate(TO_BACK_OFFICE_CREATE_PRODUCT);
        }}
      />
    </Box>
  );
};

export default BackOfficeViewProductsHeader;
