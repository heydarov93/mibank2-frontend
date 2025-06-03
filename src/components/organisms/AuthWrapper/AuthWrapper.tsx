import { ReactNode } from 'react';

import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

import { PageWrapper, StyledBoxContainer } from './AuthWrapper.styled';

import { Logo } from 'components/atoms';

export const AuthWrapper = ({ children }: { children: ReactNode }) => (
  <PageWrapper>
    <StyledBoxContainer>
      <ErrorNotification />
      <Logo size="lg" />
      {children}
    </StyledBoxContainer>
  </PageWrapper>
);
