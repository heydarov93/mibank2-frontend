import React from 'react';

import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

import { PageWrapper, StyledBoxContainer } from './AuthWrapper.styled';

import { ELogoSize, Logo } from 'components/atoms';

interface AuthWrapperProps {
  children: React.ReactNode;
  notificationPosition?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

export const AuthWrapper = ({
  children,
  notificationPosition,
}: AuthWrapperProps) => (
  <PageWrapper>
    <StyledBoxContainer>
      <ErrorNotification position={notificationPosition} />
      <Logo size={ELogoSize.MEDIUM} />
      {children}
    </StyledBoxContainer>
  </PageWrapper>
);
