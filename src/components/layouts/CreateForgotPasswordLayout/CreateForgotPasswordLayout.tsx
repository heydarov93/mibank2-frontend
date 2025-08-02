import { useNavigate } from 'react-router-dom';

import { BackArrow } from 'components/atoms/BackArrow/BackArrow';
import {
  UserAuthWrapper,
  Footer,
  CreateForgotPasswordForm,
} from 'components/organisms';

export const CreateForgotPasswordLayout = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <BackArrow onBackClick={handleBackClick} />
      <UserAuthWrapper>
        <CreateForgotPasswordForm />
      </UserAuthWrapper>
      <Footer />
    </>
  );
};
