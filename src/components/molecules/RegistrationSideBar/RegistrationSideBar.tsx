import { ErrorNotification } from '../../organisms/ErrorNotification/ErrorNotification';

import { StyledBoxContainer } from './RegistrationSideBar.styled';

import { ELogoSize, Logo } from 'components/atoms';
import { ELogoColor } from 'components/atoms/Logo/Logo';

export const RegistrationSideBar = () => (
  <StyledBoxContainer>
    <ErrorNotification />
    <Logo size={ELogoSize.MEDIUM} color={ELogoColor.WHITE} />
  </StyledBoxContainer>
);
