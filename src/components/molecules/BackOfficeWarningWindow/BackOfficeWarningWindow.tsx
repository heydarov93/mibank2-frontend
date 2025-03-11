import { Box, Button, SxProps, Theme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  MainHeader,
  ProductName,
  SecondaryHeader,
  StyledBox,
} from './BackOfficeWarningWindow.styled';

import { BackOfficeWarningIcon } from 'components/atoms';

interface BackOfficeWarningWindowProps {
  productName?: string;
  sx?: SxProps<Theme>;
  onDeleteClick?: () => void;
  onCancelClick: () => void;
  title?: string;
  text?: string;
}

export const BackOfficeWarningWindow = ({
  productName,
  sx,
  onDeleteClick,
  onCancelClick,
  title,
  text,
}: BackOfficeWarningWindowProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  return (
    <MainContainer sx={{ position: 'absolute', ...sx }}>
      <Box sx={{ display: 'flex', gap: '24px' }}>
        <StyledBox>
          <BackOfficeWarningIcon />
        </StyledBox>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <MainHeader>{title}</MainHeader>
          <SecondaryHeader>
            {text}
            {productName && <ProductName>“{productName}”?</ProductName>}
          </SecondaryHeader>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px',
        }}
      >
        <Button variant="outlined" onClick={onCancelClick}>
          {t('ConfirmationWindow.cancelBtn')}
        </Button>
        <Button variant="contained" color="error" onClick={onDeleteClick}>
          {t('ConfirmationWindow.deleteBtn')}
        </Button>
      </Box>
    </MainContainer>
  );
};
