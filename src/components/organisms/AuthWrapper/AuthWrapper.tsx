import { ReactNode } from 'react';

import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

import { PageWrapper, StyledBoxContainer } from './AuthWrapper.styled';

import { ELogoSize, Logo } from 'components/atoms';

export const AuthWrapper = ({ children }: { children: ReactNode }) => (
  <PageWrapper>
    <StyledBoxContainer>
      <ErrorNotification />
      <Logo size={ELogoSize.MEDIUM} />
      {children}
    </StyledBoxContainer>
  </PageWrapper>
);
