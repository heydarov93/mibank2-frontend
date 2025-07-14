import { StyledLogoContainer, StyledSidebar } from './LeftLogoSidebar.styled';

import { Logo } from 'components/atoms';
import { DEFAULT_BREAKPOINT_KEYS } from 'constants/ui/layout';

export const LeftLogoSidebar = () => {
  return (
    <StyledSidebar>
      <StyledLogoContainer>
        <Logo size={DEFAULT_BREAKPOINT_KEYS.xl} color="white" />
      </StyledLogoContainer>
    </StyledSidebar>
  );
};
