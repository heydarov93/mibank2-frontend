import { useTranslation } from 'react-i18next';

import {
  StyledActions,
  StyledActionsTop,
  StyledActionText,
  StyledBody,
  StyledContent,
  StyledLink,
  StyledTitle,
} from './LegalEntityVerificationContent.styled';

import { ELogoSize, Logo } from 'components/atoms';

export const LegalEntityVerificationContent = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'VerificationPage',
  });

  return (
    <StyledContent>
      <Logo size={ELogoSize.MEDIUM} />

      <StyledActions>
        <StyledActionsTop>
          <StyledTitle variant="h2">
            {t('legalEntityVerification.title')}
          </StyledTitle>

          <StyledBody variant="body1">
            {t('legalEntityVerification.body', {
              email: 'user@gmail.com',
            })}
          </StyledBody>
        </StyledActionsTop>

        <StyledActionText variant="body2">
          {t('legalEntityVerification.isReceiveEmail')}
          <StyledLink
            // TODO: replace `#` with actual path
            to="#"
            data-testid="router-link"
          >
            {t('legalEntityVerification.sendLink')}
          </StyledLink>
        </StyledActionText>
        <StyledActionText variant="body2">
          {t('legalEntityVerification.isAlreadyConfirmed')}
          <StyledLink
            // TODO: replace `#` with actual path
            to="#"
            data-testid="router-link"
          >
            {t('legalEntityVerification.loginLink')}
          </StyledLink>
        </StyledActionText>
      </StyledActions>
    </StyledContent>
  );
};
