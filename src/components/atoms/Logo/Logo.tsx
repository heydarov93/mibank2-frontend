import { Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledLogo,
  StyledLogoContainer,
  StyledLogoNameContainer,
  StyledIcon,
} from './Logo.styled';

type LogoProps = {
  size?: ELogoSize;
  color?: ELogoColor;
};

export enum ELogoSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}

export enum ELogoColor {
  DARK = 'dark',
  WHITE = 'white',
}

export const Logo = ({
  size = ELogoSize.SMALL,
  color = ELogoColor.DARK,
}: LogoProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const theme = useTheme();

  const isSmall = size === ELogoSize.SMALL;

  const isMedium = size === ELogoSize.MEDIUM;

  const isWhite = color === ELogoColor.WHITE;

  return (
    <StyledLogoContainer isMedium={isMedium} data-testid="logo">
      <StyledLogo isSmall={isSmall}>
        <StyledIcon isWhite={isWhite} />
      </StyledLogo>
      <StyledLogoNameContainer isSmall={isSmall} isWhite={isWhite}>
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
