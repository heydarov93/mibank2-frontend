import { CSSProperties, ElementType, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { MastercardIcon } from '../MastercardIcon/MastercardIcon';
import { UnionPayIcon } from '../UnionPayIcon/UnionPayIcon';
import { VisaIcon } from '../VisaIcon/VisaIcon';

import { TCardIssuer } from 'types/types';

interface CardIssuerIconProps {
  issuer: TCardIssuer;
  style?: CSSProperties;
}

const issuerMap: Record<TCardIssuer, ElementType> = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  unionpay: UnionPayIcon,
};

export const CardIssuerIcon = memo<CardIssuerIconProps>(
  ({ issuer, style }: CardIssuerIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });
    const IssuerIcon = issuerMap[issuer];
    const label = issuer.charAt(0).toUpperCase() + issuer.slice(1);

    return (
      <IssuerIcon
        style={style}
        role="img"
        aria-label={t('label.cardIssuer', { label: label })}
        title={label}
      />
    );
  },
);

CardIssuerIcon.displayName = 'CardIssuerIcon';
