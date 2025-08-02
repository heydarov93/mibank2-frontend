import Box from '@mui/material/Box';

import {
  StyledMainText,
  StyledSecondaryText,
} from './DepositBenefitItem.styled';

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
      <StyledMainText>{mainText}</StyledMainText>
      <StyledSecondaryText>{secondaryText}</StyledSecondaryText>
    </Box>
  );
};
