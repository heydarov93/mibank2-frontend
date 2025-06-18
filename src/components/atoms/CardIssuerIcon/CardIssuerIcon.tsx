import { MastercardIcon } from '../MastercardIcon/MastercardIcon';
import { VisaIcon } from '../VisaIcon/VisaIcon';

import { TCardIssuer } from 'models/types';

export function CardIssuerIcon({ issuer }: { issuer: TCardIssuer }) {
  return issuer === 'visa' ? <VisaIcon /> : <MastercardIcon />;
}
