import { Divider } from '@mui/material';
import { Children, ReactNode } from 'react';

import { StyledContainer } from './Container.styled';

export function Container({ children }: { children: ReactNode }) {
  const sections = Children.toArray(children);
  return (
    <StyledContainer>
      {sections.map((section, index) => (
        <>
          {section}
          {index !== sections.length - 1 && <Divider />}
        </>
      ))}
    </StyledContainer>
  );
}
