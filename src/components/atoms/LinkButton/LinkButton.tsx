import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledContainer, StyledLinkButton } from './LinkButton.styled';

interface ButtonLinkProps {
  message: string;
  linkText: string;
  to: string;
  delay?: number;
  shake?: boolean;
}

export const LinkButton = memo<ButtonLinkProps>(
  ({ message, linkText, to, delay, shake }: ButtonLinkProps) => {
    const { t } = useTranslation('translation');

    return (
      <StyledContainer>
        <Typography>{t(message)}</Typography>
        <StyledLinkButton
          to={to}
          delay={delay}
          shake={shake}
          aria-label={t('Accessibility.label.link')}
          data-testid="link-button"
          sx={{ marginLeft: message ? 1 : 0 }}
        >
          {t(linkText)}
        </StyledLinkButton>
      </StyledContainer>
    );
  },
);

LinkButton.displayName = 'LinkButton';
