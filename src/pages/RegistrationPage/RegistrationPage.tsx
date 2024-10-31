import { PageWrapper } from './RegistrationPage.styled';

import { RegistrationSideBar } from 'components/molecules';
import { Footer } from 'components/organisms';
import { RegistrationFormWrapper } from 'components/organisms/';

export const RegistrationPage = () => {
  return (
    <>
      <PageWrapper>
        <RegistrationSideBar />
        <RegistrationFormWrapper />
      </PageWrapper>
      <Footer />
    </>
  );
};
