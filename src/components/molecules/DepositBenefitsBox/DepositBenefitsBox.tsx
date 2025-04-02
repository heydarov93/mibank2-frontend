import React, { ReactNode } from 'react';

import {
  StyledContainer,
  PrimaryHeader,
  SecondaryText,
} from './DepostiBenefitsBox.styled';

interface DepositBenefitsBoxProps {
  svg: ReactNode;
  primaryHeader: string;
  secondaryText: string;
}

export const DepositBenefitsBox = ({
  svg,
  primaryHeader,
  secondaryText,
}: DepositBenefitsBoxProps) => {
  return (
    <StyledContainer>
      {svg}
      <PrimaryHeader>{primaryHeader}</PrimaryHeader>
      <SecondaryText>{secondaryText}</SecondaryText>
    </StyledContainer>
  );
};
