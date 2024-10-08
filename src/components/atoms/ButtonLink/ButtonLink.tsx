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
};

export const ButtonLink = ({
  message,
  linkText,
  href,
  delay,
  shake,
}: ButtonLinkProps) => {
  const { t } = useTranslation('translation');

  return (
    <StyledButtonLinkContainer>
      <Typography>{t(message)}</Typography>
      <StyledButtonLink href={href} delay={delay} shake={shake}>
        {t(linkText)}
      </StyledButtonLink>
    </StyledButtonLinkContainer>
  );
};
