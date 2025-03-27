import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { MainContainer, StyledHeader } from './AvailableDepositsWindow.styled';

import CloseButtonX from 'components/atoms/CloseButtonX/CloseButtonX';
import { DepositBox } from 'components/molecules';

interface AvailableDepositsWindowProps {
  onClose: () => void;
  isOpen: boolean;
}

export const AvailableDepositsWindow = ({
  onClose,
  isOpen,
}: AvailableDepositsWindowProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'DepositWindow' });

  if (!isOpen) {
    return null;
  }

  return (
    <MainContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <StyledHeader>{t('availableDeposits')}</StyledHeader>
        <CloseButtonX onClick={onClose} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <DepositBox />
      </Box>
    </MainContainer>
  );
};
