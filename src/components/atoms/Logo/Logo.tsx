import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledLogo,
  StyledLogoContainer,
  StyledLogoNameContainer,
} from './Logo.styled';

import { ReactComponent as BankLogoBoxIcon } from 'assets/icons/Logo.svg';

export const Logo = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });

  return (
    <StyledLogoContainer>
      <StyledLogo>
        <BankLogoBoxIcon />
      </StyledLogo>
      <StyledLogoNameContainer>
        {/* TODO: need to setup line-heaght into the theme */}
        <Typography
          sx={{ lineHeight: '16px', fontSize: '12px', fontFamily: 'Inter' }}
        >
          {t('logoTitle')}
        </Typography>
      </StyledLogoNameContainer>
    </StyledLogoContainer>
  );
};
