import { VerificationPageWrapper } from './VerificationPage.styled';

import { Footer } from 'components/organisms/Footer/Footer';
import VerificationForm from 'components/organisms/VerificationForm/VerificationForm';

const VerificationPage = () => {
  return (
    <>
      <VerificationPageWrapper>
        <VerificationForm />
      </VerificationPageWrapper>
      <Footer />
    </>
  );
};

export default VerificationPage;
