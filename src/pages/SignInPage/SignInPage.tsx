import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthWrapper, Footer, LoginForm } from 'components/organisms';
import { TokenType } from 'models/IAuth';
import { localTokenHandler } from 'utils';

export const SignInPage = () => {
  const navigate = useNavigate();

  const hasAccessToken = localTokenHandler.getToken(TokenType.ACCESS);

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
