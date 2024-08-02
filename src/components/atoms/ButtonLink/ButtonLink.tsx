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
};

export const ButtonLink = ({ message, linkText, href }: ButtonLinkProps) => {
  const { t } = useTranslation('translation');

  return (
    <StyledButtonLinkContainer>
      <Typography>{t(message)}</Typography>
      <StyledButtonLink href={href}>{t(linkText)}</StyledButtonLink>
    </StyledButtonLinkContainer>
  );
};
