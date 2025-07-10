import { StyledPageWrapper } from './RegistrationPage.styled';

import { RegistrationSideBar } from 'components/molecules';
import { Footer } from 'components/organisms';
import { RegistrationFormWrapper } from 'components/organisms/';

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
