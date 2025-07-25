import { StyledPageWrapper } from './RegistrationPage.styled';

import {
  Footer,
  RegistrationFormWrapper,
  RegistrationSideBar,
} from 'components/organisms';

export const RegistrationPage = () => {
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
