import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledLogo,
  StyledLogoContainer,
  StyledLogoNameContainer,
} from './Logo.styled';

type LogoProps = {
  size?: ELogoSize;
};

export enum ELogoSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}

import { ReactComponent as BankLogoBoxIcon } from 'assets/icons/Logo.svg';

export const Logo = ({ size = ELogoSize.SMALL }: LogoProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });

  const isSmall = size === ELogoSize.SMALL;

  const isMedium = size === ELogoSize.MEDIUM;

  return (
    <StyledLogoContainer>
      <StyledLogo isSmall={isSmall}>
        <BankLogoBoxIcon />
      </StyledLogo>
      <StyledLogoNameContainer>
        {/* TODO: need to setup line-heaght into the theme */}
        <Typography
          sx={{
            lineHeight: isSmall ? '16px' : '22px',
            fontSize: isSmall ? '12px' : '16px',
            fontFamily: 'Inter',
          }}
        >
          {t('logoTitle')}
        </Typography>
      </StyledLogoNameContainer>
    </StyledLogoContainer>
  );
};
