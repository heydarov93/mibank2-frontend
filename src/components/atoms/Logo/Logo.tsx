import { Typography, useTheme } from '@mui/material';
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
  const theme = useTheme();

  const isSmall = size === ELogoSize.SMALL;

  const isMedium = size === ELogoSize.MEDIUM;

  return (
    <StyledLogoContainer isMedium={isMedium} data-testid="logo">
      <StyledLogo isSmall={isSmall}>
        <BankLogoBoxIcon />
      </StyledLogo>
      <StyledLogoNameContainer isSmall={isSmall}>
        {/* TODO: need to setup line-heaght into the theme */}
        <Typography
          sx={
            isSmall ? theme.typography.smallLogo : theme.typography.mediumLogo
          }
        >
          {t('logoTitle')}
        </Typography>
      </StyledLogoNameContainer>
    </StyledLogoContainer>
  );
};
