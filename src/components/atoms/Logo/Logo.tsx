
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { memo, useId, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { LogoSvg } from '../LogoSvg/LogoSvg';

import { StyledContainer } from './Logo.styled';

import { DEFAULT_BREAKPOINT_KEYS, LOGO_SIZES } from 'constants/ui/layout';
import { TLogoSize, TLogoSvgColor } from 'types/types';

type TFlexDirection = 'row' | 'column-reverse' | 'column';

interface LogoProps {
  size?: TLogoSize;
  color?: TLogoSvgColor;
  labelOnTop?: boolean;
}

export const Logo = memo<LogoProps>(
  ({
    size = DEFAULT_BREAKPOINT_KEYS.sm,
    color = 'blue',
    labelOnTop = false,
  }: LogoProps) => {
    const { t } = useTranslation('translation', { keyPrefix: 'header' });
    const { iconSize, fontSize } = LOGO_SIZES[size];
    const labelId = useId();
    const { textColor, textWidth, flexDirection } = useMemo(() => {
      const isWhite = color === 'white';
      const isCompact = (['sm', 'md'] as TLogoSize[]).includes(size);
      const flexColumn = labelOnTop ? 'column-reverse' : 'column';
      const flexDirection = isCompact ? 'row' : flexColumn;
      const textWidth = isCompact ? 'min-content' : 'max-content';
      const textColor = isWhite ? 'common.white' : 'common.black';

      return {
        flexDirection,
        textWidth,
        textColor,
      };
    }, [color, size, labelOnTop]);

    return (
      <StyledContainer
        flexDirection={flexDirection as TFlexDirection}
        data-testid="logo"
        role="img"
        aria-labelledby={labelId}
      >
        <Icon sx={{ width: iconSize, height: iconSize }}>
          <LogoSvg color={color} aria-hidden="true" />
        </Icon>
        <Typography
          id={labelId}
          fontSize={fontSize}
          width={textWidth}
          color={textColor}
        >
          {t('logoTitle')}
        </Typography>
      </StyledContainer>
    );
  },
);

Logo.displayName = 'Logo';
