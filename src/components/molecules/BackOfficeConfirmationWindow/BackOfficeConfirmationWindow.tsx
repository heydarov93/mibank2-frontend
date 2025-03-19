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
    <MainContainer sx={{ position: 'absolute', ...sx }}>
      <SuccessfulCreationIcon />
      <Box>
        <StyledHeader data-testid="confirmation-title">{title}</StyledHeader>
        <SecondaryText data-testid="secondary-text">{body}</SecondaryText>
      </Box>
      <CloseButtonX onClick={onClose} />
    </MainContainer>
  );
};

export default BackOfficeConfirmationWindow;
