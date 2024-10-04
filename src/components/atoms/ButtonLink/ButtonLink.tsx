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
  shake?: boolean;
};

export const ButtonLink = ({ message, linkText, href, shake = false }: ButtonLinkProps) => {
  const { t } = useTranslation('translation');

  return (
    <StyledButtonLinkContainer>
      <Typography>{t(message)}</Typography>
      <StyledButtonLink href={href} className={shake ? 'shake' : ''}>{t(linkText)}</StyledButtonLink>
    </StyledButtonLinkContainer>
  );
};
