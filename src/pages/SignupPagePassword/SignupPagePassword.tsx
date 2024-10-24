import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthWrapper, Footer, SignupFormPassword } from 'components/organisms';
import { useAppSelector } from 'hooks';
import { getEmail } from 'store/selectors/AuthSelectors';

export const SignupPagePassword = () => {
  const navigate = useNavigate();
  const email = useAppSelector(getEmail);
  const isEmailVerified = Boolean(email);

  useEffect(() => {
    if (!isEmailVerified) {
      navigate(-1);
    }
  }, [isEmailVerified]);

  return isEmailVerified ? (
    <>
      <AuthWrapper>
        <SignupFormPassword />
      </AuthWrapper>
      <Footer />
    </>
  ) : null;
};
