import { CSSProperties } from 'react';

import { MastercardIcon } from '../MastercardIcon/MastercardIcon';
import { UnionPayIcon } from '../UnionPayIcon/UnionPayIcon';
import { VisaIcon } from '../VisaIcon/VisaIcon';

import { TCardIssuer } from 'models/types';

interface Props {
  issuer: TCardIssuer;
  style?: CSSProperties;
}

export function CardIssuerIcon({ issuer, style }: Props) {
  const icon = {
    visa: <VisaIcon style={style} />,
    mastercard: <MastercardIcon style={style} />,
    unionpay: <UnionPayIcon style={style} />,
  };

  return icon[issuer];
}
