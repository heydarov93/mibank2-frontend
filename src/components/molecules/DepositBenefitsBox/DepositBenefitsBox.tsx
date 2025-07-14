import React, { ReactNode } from 'react';

import {
  StyledContainer,
  PrimaryHeader,
  SecondaryText,
} from './DepostiBenefitsBox.styled';

interface DepositBenefitsBoxProps {
  icon: ReactNode;
  primaryText: string;
  secondaryText: string;
}

export const DepositBenefitsBox = ({
  icon,
  primaryText,
  secondaryText,
}: DepositBenefitsBoxProps) => {
  return (
    <StyledContainer>
      {icon}
      <PrimaryHeader>{primaryText}</PrimaryHeader>
      <SecondaryText>{secondaryText}</SecondaryText>
    </StyledContainer>
  );
};
