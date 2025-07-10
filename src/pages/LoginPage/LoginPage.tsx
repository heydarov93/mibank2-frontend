import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthWrapper, Footer, LoginForm } from 'components/organisms';
import { TO_HOME } from 'constants/routesName';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils/auth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const hasAccessToken = localTokenHandler.getToken(ETokenType.ACCESS);

  useEffect(() => {
    if (hasAccessToken) {
      navigate(TO_HOME);
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
