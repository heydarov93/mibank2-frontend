import { Box } from '@mui/material';

import {
  StyledBackArrowIcon,
  StyledBackButton,
} from './DepositLearnMoreHeader.styled';

interface DepositLearnMoreHeaderProps {
  onBack: () => void;
  label: string;
}
export const DepositLearnMoreHeader = ({
  onBack,
  label,
}: DepositLearnMoreHeaderProps) => (
  <Box position="relative">
    <StyledBackButton
      onClick={onBack}
      startIcon={<StyledBackArrowIcon />}
      data-testid="back-button"
      variant="text"
    >
      {label}
    </StyledBackButton>
  </Box>
);
