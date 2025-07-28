import { useNavigate } from 'react-router-dom';

import { BackArrow } from 'components/atoms';
import { UserAuthWrapper, Footer, ForgotPassword } from 'components/organisms';
import { TO_SIGN_IN } from 'constants/navigation/routePaths';

export const ForgotPasswordLayout = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(TO_SIGN_IN);
  };

  return (
    <>
      <UserAuthWrapper>
        <BackArrow onBackClick={handleBackClick} />
        <ForgotPassword />
      </UserAuthWrapper>
      <Footer />
    </>
  );
};
