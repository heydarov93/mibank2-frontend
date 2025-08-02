import { StyledPageWrapper } from './RegistrationLayout.styled';

import {
  Footer,
  RegistrationFormWrapper,
  RegistrationSideBar,
} from 'components/organisms';

export const RegistrationLayout = () => {
  return (
    <>
      <StyledPageWrapper>
        <RegistrationSideBar />
        <RegistrationFormWrapper />
      </StyledPageWrapper>
      <Footer />
    </>
  );
};
