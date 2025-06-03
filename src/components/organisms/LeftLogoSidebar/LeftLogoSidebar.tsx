import { StyledLogoContainer, StyledSidebar } from './LeftLogoSidebar.styled';

import { Logo } from 'components/atoms';

export const LeftLogoSidebar = () => {
  return (
    <StyledSidebar>
      <StyledLogoContainer>
        <Logo size="xl" color="white" />
      </StyledLogoContainer>
    </StyledSidebar>
  );
};
