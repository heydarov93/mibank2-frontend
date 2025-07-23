import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledContainer,
  StyledTitleContainer,
  StyledTitle,
  StyledDescription,
} from './ForgotPasswordConfirmationPage.styled';

import { BackArrow, LinkButton } from 'components/atoms';
import { AuthWrapper, Footer } from 'components/organisms';
import { TO_SIGN_IN } from 'constants/navigation/routePaths';

export const ForgotPasswordConfirmationPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'ForgotPassword' });
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(TO_SIGN_IN);
  };

  return (
    <>
      <BackArrow onBackClick={handleBackClick} />
      <AuthWrapper>
        <StyledContainer>
          <StyledTitleContainer>
            <StyledTitle variant="h5">{t('PasswordUpdated')}</StyledTitle>
            <StyledDescription>
              <LinkButton
                message={t('PasswordUpdatedDescription')}
                linkText="SignupPage.moveToLoginLink"
                to={TO_SIGN_IN}
              />
            </StyledDescription>
          </StyledTitleContainer>
        </StyledContainer>
      </AuthWrapper>
      <Footer />
    </>
  );
};
