import { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as MasterCardSVG } from 'assets/icons/Mastercard.svg';

interface MastercardIconProps {
  style?: CSSProperties;
}

export const MastercardIcon = memo<MastercardIconProps>(
  ({ style, ...props }: MastercardIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <MasterCardSVG
        style={style}
        data-testid="card-issuer-icon"
        role="img"
        aria-label={t('label.masterCard')}
        {...props}
      />
    );
  },
);

MastercardIcon.displayName = 'MastercardIcon';
