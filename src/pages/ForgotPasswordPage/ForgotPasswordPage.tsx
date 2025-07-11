import { useNavigate } from 'react-router-dom';

import { BackArrow } from 'components/atoms';
import { AuthWrapper, Footer, ForgotPassword } from 'components/organisms';
import { TO_SIGN_IN } from 'constants/routesName';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(TO_SIGN_IN);
  };

  return (
    <>
      <AuthWrapper>
        <BackArrow onBackClick={handleBackClick} />
        <ForgotPassword />
      </AuthWrapper>
      <Footer />
    </>
  );
};
