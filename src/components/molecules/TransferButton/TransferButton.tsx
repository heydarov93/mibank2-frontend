import { ButtonProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { StyledContainer, StyledIconContainer } from './TransferButton.styled';

interface TransferButtonProps extends ButtonProps {
  label: ReactNode;
  icon: ReactNode;
}

export function TransferButton({
  label,
  icon,
  ...buttonProps
}: TransferButtonProps) {
  return (
    <StyledContainer {...buttonProps}>
      <StyledIconContainer>{icon}</StyledIconContainer>
      <Typography
        variant="subtitle1"
        component="p"
        fontSize={18}
        fontWeight={600}
        color="common.black"
        textAlign="left"
      >
        {label}
      </Typography>
    </StyledContainer>
  );
}
