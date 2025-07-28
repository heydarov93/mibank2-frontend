import Divider from '@mui/material/Divider';
import { Children, Fragment, ReactNode } from 'react';

import { StyledContainer } from './Container.styled';

export function Container({ children }: { children: ReactNode }) {
  const sections = Children.toArray(children);
  return (
    <StyledContainer>
      {sections.map((section, index) => (
        <Fragment key={index}>
          {section}
          {index !== sections.length - 1 && <Divider />}
        </Fragment>
      ))}
    </StyledContainer>
  );
}
