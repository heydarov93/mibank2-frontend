import { Box } from '@mui/material';

import {
  StyledInfoCardMainText,
  StyledInfoCardSecondaryText,
} from './DepositInfoCard.styled';

import { ReactComponent as CheckIcon } from 'assets/icons/CheckIcon.svg';

interface DepositBenefitItemProps {
  mainText: string;
  secondaryText: string;
}

export const DepositBenefitItem = ({
  mainText,
  secondaryText,
}: DepositBenefitItemProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <CheckIcon />
      <StyledInfoCardMainText>{mainText}</StyledInfoCardMainText>
      <StyledInfoCardSecondaryText>{secondaryText}</StyledInfoCardSecondaryText>
    </Box>
  );
};
