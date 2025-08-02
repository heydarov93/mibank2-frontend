import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserAuthWrapper, EmployeeLoginForm } from 'components/organisms';
import { TO_HOME } from 'constants/navigation/routePaths';
import { ETokenType } from 'enums';
import { localTokenHandler } from 'utils/auth';

export const EmployeeLoginLayout = () => {
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
      <UserAuthWrapper>
        <EmployeeLoginForm />
      </UserAuthWrapper>
    </>
  );
};
