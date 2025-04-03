import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

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
  title?: string;
  body?: string;
}

const BackOfficeConfirmationWindow = ({
  onClose,
  sx,
  title,
  body,
}: BackOfficeConfirmationWindowProps) => {
  return (
    <MainContainer sx={{ position: 'fixed', ...sx }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '12px',
        }}
      >
        <Box
          sx={{
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SuccessfulCreationIcon sx={{ width: '48px', height: '48px' }} />
        </Box>
        <Box>
          <StyledHeader data-testid="confirmation-title">{title}</StyledHeader>
          <SecondaryText data-testid="secondary-text">{body}</SecondaryText>
        </Box>
      </Box>
      <CloseButtonX onClick={onClose} />
    </MainContainer>
  );
};

export default BackOfficeConfirmationWindow;
