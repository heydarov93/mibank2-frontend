import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledBox,
  StyledTitleContainer,
  StyledTitle,
  StyledDescription,
} from './ForgotPasswordPageFinished.styled';

import { BackArrow, ButtonLink } from 'components/atoms';
import { AuthWrapper, Footer } from 'components/organisms';
import { TO_SIGN_IN } from 'constants/routesName';

export const ForgotPasswordPageFinished = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'ForgotPassword' });
  const navigate = useNavigate();

  const backToLogIn = () => {
    navigate(TO_SIGN_IN);
  };

  return (
    <>
      <BackArrow onBackClick={backToLogIn} />
      <AuthWrapper>
        <StyledBox>
          <StyledTitleContainer>
            <StyledTitle
              variant="h5"
              fontWeight="500"
              textAlign="center"
              marginBottom={6}
            >
              {t('PasswordUpdated')}
            </StyledTitle>
            <StyledDescription>
              <ButtonLink
                message={t('PasswordUpdatedDescription')}
                linkText="SignupPage.moveToLoginLink"
                href="/signin"
              />
            </StyledDescription>
          </StyledTitleContainer>
        </StyledBox>
      </AuthWrapper>
      <Footer />
    </>
  );
};
