import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BackButton } from 'components/atoms';
import { UserAuthWrapper, Footer, OtpVerificationForm } from 'components/organisms';
import { useAppSelector } from 'hooks';
import { getIsVerifying } from 'store/slices/auth';

export const VerificationLayout = () => {
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
      <UserAuthWrapper>
        <OtpVerificationForm disableFields={shouldDisableFields} />
      </UserAuthWrapper>
      <Footer />
    </>
  );
};
