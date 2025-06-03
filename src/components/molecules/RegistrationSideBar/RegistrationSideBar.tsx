import { ErrorNotification } from '../../organisms/ErrorNotification/ErrorNotification';

import { StyledBoxContainer } from './RegistrationSideBar.styled';

import { Logo } from 'components/atoms';

export const RegistrationSideBar = () => (
  <StyledBoxContainer>
    <ErrorNotification />
    <Logo size="xl" color="white" />
  </StyledBoxContainer>
);
