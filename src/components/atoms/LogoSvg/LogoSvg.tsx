import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as LogoSvgBlue } from 'assets/icons/Logo.svg';
import { ReactComponent as LogoSvgWhite } from 'assets/icons/LogoWhite.svg';
import { TLogoSvgColor } from 'types/types';

export const LogoSvg = memo<{ color: TLogoSvgColor }>(
  ({ color, ...props }: { color: TLogoSvgColor }) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });
    const SvgComponent = color === 'white' ? LogoSvgWhite : LogoSvgBlue;

    return (
      <SvgComponent
        role="img"
        aria-label={t('label.svgLogo')}
        style={{ width: '100%', height: '100%' }}
        {...props}
      />
    );
  },
);

LogoSvg.displayName = 'LogoSvg';
