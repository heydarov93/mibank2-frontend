import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { StyledContainer } from './AuthPageWrapper.styled';

import {
  BackArrow,
  ButtonLink,
  ELogoSize,
  Logo,
  NavigationWarningModal,
} from 'components/atoms';
import { Footer } from 'components/organisms';
import {
  TO_BUSINESS_SIGN_IN,
  TO_BUSINESS_SIGN_UP,
  TO_BUSINESS_CREATE_PASSWORD,
  TO_SIGN_IN,
  TO_VERIFY_EMAIL,
  TO_WELCOME,
} from 'constants/routesName';
import { EWelcomeTab } from 'enums/EWelcomeTab';

export function AuthPageWrapper({ children }: { children: ReactNode }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.form.createPassword',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);
  const onVerifyEmail = location.pathname === TO_VERIFY_EMAIL;

  const handleBackClick = () => {
    if (onVerifyEmail) {
      navigate(`${TO_WELCOME}?tab=${EWelcomeTab.Business}`);
    } else {
      setModalOpen(true);
    }
  };

  const handleNavigateBack = () => {
    navigate(`${TO_WELCOME}?tab=${EWelcomeTab.Business}`);
    setModalOpen(false);
  };

  const handleCancelNavigateBack = () => {
    setModalOpen(false);
  };

  const onBusiness = [
    TO_BUSINESS_SIGN_UP,
    TO_BUSINESS_CREATE_PASSWORD,
  ].includes(location.pathname);
  // state.from should store the route where we came from
  const isPreviousBusiness =
    location.state?.from === TO_BUSINESS_CREATE_PASSWORD;

  const loginRoute =
    onBusiness || (onVerifyEmail && isPreviousBusiness)
      ? TO_BUSINESS_SIGN_IN
      : TO_SIGN_IN;

  return (
    <>
      <BackArrow onBackClick={handleBackClick} />
      <NavigationWarningModal
        open={isModalOpen}
        onConfirm={handleNavigateBack}
        onCancel={handleCancelNavigateBack}
      />
      <StyledContainer>
        <Logo size={ELogoSize.MEDIUM} />
        {children}
        <ButtonLink
          message={t('doesAccountExist')}
          linkText={t('logIn')}
          href={loginRoute}
        />
      </StyledContainer>
      <Footer />
    </>
  );
}
