import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  PrimaryHeader,
  SecondaryHeader,
} from './BackOfficeViewProductsHeader.styled';

import { SubmitButton } from 'components/atoms';

const BackOfficeViewProductsHeader = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
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
      <SubmitButton buttonContent="Create Product" />
    </Box>
  );
};

export default BackOfficeViewProductsHeader;
