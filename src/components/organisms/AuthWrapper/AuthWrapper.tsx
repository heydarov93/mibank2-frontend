import { ReactNode } from 'react';

import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

import { PageWrapper, StyledBoxContainer } from './AuthWrapper.styled';

import { Logo } from 'components/atoms';
import { DEFAULT_BREAKPOINT_KEYS } from 'constants/ui/layout';

export const AuthWrapper = ({ children }: { children: ReactNode }) => (
  <PageWrapper>
    <StyledBoxContainer>
      <ErrorNotification />
      <Logo size={DEFAULT_BREAKPOINT_KEYS.lg} />
      {children}
    </StyledBoxContainer>
  </PageWrapper>
);
