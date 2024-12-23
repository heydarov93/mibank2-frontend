import { useNavigate } from 'react-router-dom';

import { BackArrow } from 'components/atoms/BackArrow/BackArrow';
import { AuthWrapper, Footer } from 'components/organisms';
import { CreateForgotPasswordForm } from 'components/organisms';

export const CreateFogotPasswordPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <BackArrow onBackClick={handleBackClick} />
      <AuthWrapper>
        <CreateForgotPasswordForm />
      </AuthWrapper>
      <Footer />
    </>
  );
};
