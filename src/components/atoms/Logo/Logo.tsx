import { Icon, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledContainer } from './Logo.styled';

import { ReactComponent as LogoSvgBlue } from 'assets/icons/Logo.svg';
import { ReactComponent as LogoSvgWhite } from 'assets/icons/LogoWhite.svg';
import { theme } from 'theme/theme';

type TLogoSize = keyof typeof theme.logo;
type TLogoColor = 'blue' | 'white';

interface ILogoProps {
  size?: TLogoSize;
  color?: TLogoColor;
  labelOnTop?: boolean;
}

const LogoSvg = ({ color }: { color: TLogoColor }) => {
  const props = { width: '100%', height: '100%' };
  return (
    <>
      {color === 'blue' && <LogoSvgBlue {...props} />}
      {color === 'white' && <LogoSvgWhite {...props} />}
    </>
  );
};

export function Logo({
  size = 'sm',
  color = 'blue',
  labelOnTop = false,
}: ILogoProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const theme = useTheme();
  const logo = theme.logo[size];

  const isWhite = color === 'white';
  const isCompact = ['sm', 'md'].includes(size);
  const flexColumn = labelOnTop ? 'column-reverse' : 'column';
  const flexDirection = isCompact ? 'row' : flexColumn;
  const textWidth = isCompact ? 'min-content' : 'max-content';

  return (
    <StyledContainer flexDirection={flexDirection} data-testid="logo">
      <Icon sx={{ width: logo.iconSize, height: logo.iconSize }}>
        <LogoSvg color={color} />
      </Icon>
      <Typography
        fontSize={logo.fontSize}
        width={textWidth}
        color={isWhite ? 'common.white' : 'common.black'}
      >
        {t('logoTitle')}
      </Typography>
    </StyledContainer>
  );
}
