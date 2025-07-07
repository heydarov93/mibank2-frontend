import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthWrapper, Footer, LoginForm } from 'components/organisms';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils/auth';

export const SignInPage = () => {
  const navigate = useNavigate();

  const hasAccessToken = localTokenHandler.getToken(ETokenType.ACCESS);

  useEffect(() => {
    if (hasAccessToken) {
      navigate('/');
    }
  }, [hasAccessToken, navigate]);

  if (hasAccessToken) return null;

  return (
    <>
      <AuthWrapper>
        <LoginForm />
      </AuthWrapper>
      <Footer />
    </>
  );
};
