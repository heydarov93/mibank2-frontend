import { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as UnionPaySVG } from 'assets/icons/UnionPay.svg';

interface UnionPayIconProps {
  style?: CSSProperties;
}

export const UnionPayIcon = memo<UnionPayIconProps>(
  ({ style, ...props }: UnionPayIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <UnionPaySVG
        style={style}
        data-testid="card-issuer-icon"
        role="img"
        aria-label={t('label.unionPay')}
        {...props}
      />
    );
  },
);

UnionPayIcon.displayName = 'UnionPay';
