import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthWrapper } from 'components/organisms';
import { BackOfficeEmployeeLoginForm } from 'components/organisms/BackOfficeEmployeeLoginForm/BackOfficeEmployeeLoginForm';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils/auth';

export const BackOfficeEmployeeLoginPage = () => {
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
        <BackOfficeEmployeeLoginForm />
      </AuthWrapper>
    </>
  );
};
