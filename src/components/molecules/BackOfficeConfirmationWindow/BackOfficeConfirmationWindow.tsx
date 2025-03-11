import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  StyledHeader,
  SecondaryText,
} from './BackOfficeConfirmationWindow.styled';

import CloseButtonX from 'components/atoms/CloseButtonX/CloseButtonX';
import SuccessfulCreationIcon from 'components/atoms/SuccessfulCreationIcon/SuccessfulCreationIcon';

interface BackOfficeConfirmationWindowProps {
  onClose: () => void;
  sx?: SxProps<Theme>;
}

const BackOfficeConfirmationWindow = ({
  onClose,
  sx,
}: BackOfficeConfirmationWindowProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  return (
    <MainContainer sx={{ position: 'absolute', ...sx }}>
      <SuccessfulCreationIcon />
      <Box>
        <StyledHeader data-testid="confirmation-title">
          {t('ConfirmationWindow.confirmationTitle')}
        </StyledHeader>
        <SecondaryText data-testid="secondary-text">
          {t('ConfirmationWindow.secondaryText')}
        </SecondaryText>
      </Box>
      <CloseButtonX onClick={onClose} />
    </MainContainer>
  );
};

export default BackOfficeConfirmationWindow;
