import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  LogoContainer,
  StyledLogo,
  StyledLogoNameContainer,
} from './Logo.styled';

import { ReactComponent as BankLogoBoxIcon } from 'assets/icons/Logo.svg';

export const Logo = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });

  return (
    <StyledLogo>
      <LogoContainer>
        <BankLogoBoxIcon />
      </LogoContainer>
      <StyledLogoNameContainer>
        {/* TODO: need to setup line-heaght into the theme */}
        <Typography sx={{ lineHeight: '22px' }} variant="subtitle1">
          {t('logoTitle')}
        </Typography>
      </StyledLogoNameContainer>
    </StyledLogo>
  );
};
