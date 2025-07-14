import { ErrorNotification } from '../../organisms/ErrorNotification/ErrorNotification';

import { StyledBoxContainer } from './RegistrationSideBar.styled';

import { Logo } from 'components/atoms';
import { DEFAULT_BREAKPOINT_KEYS } from 'constants/ui/layout';

export const RegistrationSideBar = () => (
  <StyledBoxContainer>
    <ErrorNotification />
    <Logo size={DEFAULT_BREAKPOINT_KEYS.xl} color="white" />
  </StyledBoxContainer>
);
