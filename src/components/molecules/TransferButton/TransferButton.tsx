import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LoopIcon from '@mui/icons-material/Loop';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { StyledContainer, StyledIconContainer } from './TransferButton.styled';

import { TTransferMethod } from 'pages/TransfersPage/TransfersPage';

interface TransferButtonProps extends LinkProps {
  label: ReactNode;
  transferMethod: TTransferMethod;
}

export function TransferButton({
  label,
  to,
  transferMethod,
}: TransferButtonProps) {
  const Icon = () =>
    transferMethod === 'iban' ? (
      <AccountBalanceIcon />
    ) : transferMethod === 'card' ? (
      <CreditCardIcon />
    ) : (
      <LoopIcon />
    );

  return (
    <StyledContainer to={to} component={Link}>
      <StyledIconContainer>{<Icon />}</StyledIconContainer>
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
