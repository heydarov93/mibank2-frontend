import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthWrapper, Footer, VerificationForm } from 'components/organisms';
import { TokenType } from 'models/IAuth';
import { localTokenHandler } from 'utils';

export const VerificationPage = () => {
  const navigate = useNavigate();

  const hasToken = localTokenHandler.getToken(TokenType.TEMPORARY);

  useEffect(() => {
    if (!hasToken) {
      navigate('/signin');
    }
  }, [hasToken, navigate]);

  if (!hasToken) return null;

  return (
    <>
      <AuthWrapper>
        <VerificationForm />
      </AuthWrapper>
      <Footer />
    </>
  );
};
