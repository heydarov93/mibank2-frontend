import CircularProgress from '@mui/material/CircularProgress';
import { ReactNode } from 'react';

import {
  StyledStepBox,
  StyledStepColumn,
  StyledStepContainer,
  StyledStepDescription,
  StyledStepRow,
  StyledTitle,
} from './BackOfficeVerificationStep.styled';

interface BackOfficeVerificationStepProps {
  stepLabel: string;
  headerLabel: string;
  descriptionLabel: string;
  loading: boolean;
  children: ReactNode;
}
export const BackOfficeVerificationStep = ({
  stepLabel,
  headerLabel,
  descriptionLabel,
  loading,
  children,
}: BackOfficeVerificationStepProps) => (
  <StyledStepBox>
    <StyledStepRow>
      <StyledStepContainer>{stepLabel}</StyledStepContainer>
      <StyledTitle>{headerLabel}</StyledTitle>
    </StyledStepRow>

    <StyledStepColumn>
      <StyledStepDescription>{descriptionLabel}</StyledStepDescription>
      {loading ? <CircularProgress /> : children}
    </StyledStepColumn>
  </StyledStepBox>
);
