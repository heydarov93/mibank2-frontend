import { PageWrapper } from './RegistrationPage.styled';

import { RegistrationSideBar } from 'components/molecules';
import { Footer, RegistrationFormPersonalInfo } from 'components/organisms';

export const RegistrationPage = () => {
  return (
    <>
      <PageWrapper>
        <RegistrationSideBar />
        <RegistrationFormPersonalInfo />
      </PageWrapper>
      <Footer />
    </>
  );
};
