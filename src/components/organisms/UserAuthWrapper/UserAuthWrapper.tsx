import { ReactNode } from 'react';

import { PageWrapper, StyledBoxContainer } from './UserAuthWrapper.styled';

import { Logo } from 'components/atoms';
import { ErrorNotification } from 'components/molecules';
import { DEFAULT_BREAKPOINT_KEYS } from 'constants/ui/layout';

export const UserAuthWrapper = ({ children }: { children: ReactNode }) => (
  <PageWrapper>
    <StyledBoxContainer>
      <ErrorNotification />
      <Logo size={DEFAULT_BREAKPOINT_KEYS.lg} />
      {children}
    </StyledBoxContainer>
  </PageWrapper>
);
