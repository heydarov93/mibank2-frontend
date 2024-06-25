import { VerificationPageWrapper } from './VerificationPage.styled';

import { Footer, VerificationForm } from 'components/organisms';

export const VerificationPage = () => {
  return (
    <>
      <VerificationPageWrapper>
        <VerificationForm />
      </VerificationPageWrapper>
      <Footer />
    </>
  );
};
