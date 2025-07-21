import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BackButton } from 'components/atoms';
import { AuthWrapper, Footer, VerificationForm } from 'components/organisms';
import { useAppSelector } from 'hooks';
import { getIsVerifying } from 'store/slices/auth';

export const VerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isVerifying = useAppSelector(getIsVerifying);
  const shouldDisableFields = Boolean(location.state?.isError);

  useEffect(() => {
    if (!isVerifying) {
      navigate(-1);
    }
  }, [isVerifying, navigate]);

  if (!isVerifying) {
    return null;
  }

  return (
    <>
      <BackButton />
      <AuthWrapper>
        <VerificationForm disableFields={shouldDisableFields} />
      </AuthWrapper>
      <Footer />
    </>
  );
};
