import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { StyledContainer } from './AuthPageWrapper.styled';

import {
  BackArrow,
  ButtonLink,
  Logo,
  NavigationWarningModal,
} from 'components/atoms';
import { Footer } from 'components/organisms';
import {
  TO_BUSINESS_CREATE_PASSWORD,
  TO_BUSINESS_LOG_IN,
  TO_BUSINESS_SIGN_UP,
  TO_SIGN_IN,
  TO_VERIFY_EMAIL
} from 'constants/routesName';
import { useNavigationWarning } from 'hooks';

export function AuthPageWrapper({ children }: { children: ReactNode }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.form.createPassword',
  });
  const location = useLocation();
  const onVerifyEmail = location.pathname === TO_VERIFY_EMAIL;
  const {
    warningModalOpen,
    handleBackClick,
    handleNavigateBack,
    handleCancelNavigateBack,
  } = useNavigationWarning({ onVerifyEmail, redirectToSignIn: false });

  const onBusiness = [
    TO_BUSINESS_SIGN_UP,
    TO_BUSINESS_CREATE_PASSWORD,
  ].includes(location.pathname);

  // state.from should store the route where we came from
  const isPreviousBusiness =
    location.state?.from === TO_BUSINESS_CREATE_PASSWORD;

  const loginRoute =
    onBusiness || (onVerifyEmail && isPreviousBusiness)
      ? TO_BUSINESS_LOG_IN
      : TO_SIGN_IN;

  return (
    <>
      <BackArrow onBackClick={handleBackClick} />
      <NavigationWarningModal
        open={warningModalOpen}
        onConfirm={handleNavigateBack}
        onCancel={handleCancelNavigateBack}
      />
      <StyledContainer>
        <Logo size="lg" />
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
