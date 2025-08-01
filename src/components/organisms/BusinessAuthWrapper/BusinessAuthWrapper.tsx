import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { StyledContainer } from './BusinessAuthWrapper.styled';

import { BackArrow, LinkButton, Logo } from 'components/atoms';
import { Footer, NavigationWarningModal } from 'components/organisms';
import {
  TO_BUSINESS_CREATE_PASSWORD,
  TO_BUSINESS_LOG_IN,
  TO_BUSINESS_SIGN_UP,
  TO_SIGN_IN,
  TO_VERIFY_EMAIL,
} from 'constants/navigation/routePaths';
import { DEFAULT_BREAKPOINT_KEYS } from 'constants/ui/layout';
import { useBackNavigationGuard } from 'hooks';

export function BusinessAuthWrapper({ children }: { children: ReactNode }) {
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
  } = useBackNavigationGuard({ onVerifyEmail, redirectToSignIn: false });

  const onBusiness = [
    TO_BUSINESS_SIGN_UP,
    TO_BUSINESS_CREATE_PASSWORD,
  ].includes(location.pathname);

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
        <Logo size={DEFAULT_BREAKPOINT_KEYS.lg} />
        {children}
        <LinkButton
          message={t('doesAccountExist')}
          linkText={t('logIn')}
          to={loginRoute}
        />
      </StyledContainer>
      <Footer />
    </>
  );
}
