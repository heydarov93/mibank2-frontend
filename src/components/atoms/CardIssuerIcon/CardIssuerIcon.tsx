import { MastercardIcon } from '../MastercardIcon/MastercardIcon';
import { VisaIcon } from '../VisaIcon/VisaIcon';

import { CardIssuer } from 'components/organisms/TransferForm/hooks/useAccounts';

export function CardIssuerIcon({ issuer }: { issuer: CardIssuer }) {
  return issuer === 'visa' ? <VisaIcon /> : <MastercardIcon />;
}
