import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledButtonLinkContainer,
  StyledButtonLink,
} from './ButtonLink.styled';

type ButtonLinkProps = {
  message: string;
  linkText: string;
  href: string;
  delay?: number;
  shake?: boolean;
  onAnimationEnd?: () => void;
};

export const ButtonLink = ({
  message,
  linkText,
  href,
  delay,
  shake,
  onAnimationEnd,
}: ButtonLinkProps) => {
  const { t } = useTranslation('translation');

  return (
    <StyledButtonLinkContainer>
      <Typography>{t(message)}</Typography>
      <StyledButtonLink
        href={href}
        delay={delay}
        shake={shake}
        onAnimationEnd={onAnimationEnd}
      >
        {t(linkText)}
      </StyledButtonLink>
    </StyledButtonLinkContainer>
  );
};
