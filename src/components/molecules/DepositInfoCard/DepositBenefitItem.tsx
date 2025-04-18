import { Box } from '@mui/material';

import {
  StyledBlueTickIcon,
  StyledInfoCardMainText,
  StyledInfoCardSecondaryText,
} from './DepositInfoCard.styled';

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
      <StyledBlueTickIcon />
      <StyledInfoCardMainText>{mainText}</StyledInfoCardMainText>
      <StyledInfoCardSecondaryText>{secondaryText}</StyledInfoCardSecondaryText>
    </Box>
  );
};
