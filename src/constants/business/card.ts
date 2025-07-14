import { t } from 'i18next';

export const CARD_ISSUERS = [{ value: 'Visa' }, { value: 'MasterCard' }];
export const ISSUE_TYPES = [
  { value: 'digital', label: 'Digital' },
  { value: 'plastic', label: 'Plastic' },
];

export const CARD_ISSUER_OPTIONS = [t('BackOffice.VisaCard.visa'), t('BackOffice.VisaCard.masterCard')];
export const CARD_TYPE_OPTIONS = [t('BackOffice.VisaCard.digital'), t('BackOffice.VisaCard.plastic')];

export const CARD_STATUS = {
  blocked: 'BLOCKED',
  active: 'ACTIVE',
} as const;
