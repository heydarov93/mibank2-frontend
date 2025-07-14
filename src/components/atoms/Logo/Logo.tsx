import { Icon, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledContainer } from './Logo.styled';

import { ReactComponent as LogoSvgBlue } from 'assets/icons/Logo.svg';
import { ReactComponent as LogoSvgWhite } from 'assets/icons/LogoWhite.svg';
import { DEFAULT_BREAKPOINT_KEYS, LOGO_SIZES } from 'constants/ui/layout';
import { TLogoSize } from 'types/types';

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
  size = DEFAULT_BREAKPOINT_KEYS.sm,
  color = 'blue',
  labelOnTop = false,
}: ILogoProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const logo = LOGO_SIZES[size];

  const isWhite = color === 'white';
  const isCompact = (['sm', 'md'] as TLogoSize[]).includes(size);
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
