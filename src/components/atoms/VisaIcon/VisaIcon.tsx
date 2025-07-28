import { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as VisaSVG } from 'assets/icons/Visa.svg';

interface VisaIconProps {
  style?: CSSProperties;
}

export const VisaIcon = memo<VisaIconProps>(
  ({ style, ...props }: VisaIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <VisaSVG
        style={style}
        data-testid="card-issuer-icon"
        role="img"
        aria-label={t('label.visa')}
        {...props}
      />
    );
  },
);

VisaIcon.displayName = 'VisaIcon';
