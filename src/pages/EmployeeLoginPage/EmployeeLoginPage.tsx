import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthWrapper, BackOfficeEmployeeLoginForm } from 'components/organisms';
import { TO_HOME } from 'constants/navigation/routePaths';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils/auth';

export const EmployeeLoginPage = () => {
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
        <BackOfficeEmployeeLoginForm />
      </AuthWrapper>
    </>
  );
};
