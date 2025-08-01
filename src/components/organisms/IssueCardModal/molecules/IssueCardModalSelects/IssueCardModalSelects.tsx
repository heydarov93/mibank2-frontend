import { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CardIssueFormValues } from '../../hooks/useCardIssuanceFlow';

import { FieldWithLabel } from 'components/atoms';
import { AccountSelect, SelectField } from 'components/molecules';
import { t } from 'config';
import { SUPPORTED_CURRENCIES } from 'constants/data/currencies';
import { EAccount } from 'enums/EAccount';
import { ECardType, ECardIssueType, ECardIssuer } from 'models/IProductInfo';

const currenciesOptions = SUPPORTED_CURRENCIES.map((value) => ({ value }));

const cardTypes = [
  { value: ECardType.DEBIT, label: t('IssueCardModal.debitCard') },
  { value: ECardType.CREDIT, label: t('IssueCardModal.creditCard') },
];

const issueTypes = [
  { value: ECardIssueType.DIGITAL, label: t('IssueCardModal.digital') },
  { value: ECardIssueType.PLASTIC, label: t('IssueCardModal.plastic') },
];

const cardIssuers = [
  { value: ECardIssuer.VISA, label: 'Visa' },
  { value: ECardIssuer.MASTERCARD, label: 'MasterCard' },
];

interface IssueCardModalSelectsProps {
  sx?: SxProps<Theme>;
}

export const IssueCardModalSelects = ({ sx }: IssueCardModalSelectsProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });
  const { control, setValue } = useFormContext<CardIssueFormValues>();

  function handleAccountChange(e: SelectChangeEvent<string | string[]>) {
    const { value } = e.target;

    if (value !== EAccount.NEW_ACCOUNT) {
      setValue('paymentAccount', value as string);
    }
  }

  return (
    <Stack gap={2.5} sx={sx}>
      <AccountSelect
        name="issuanceAccount"
        control={control}
        withNewAccount
        onChange={handleAccountChange}
      />
      <FieldWithLabel label={t('currency')}>
        <SelectField
          options={currenciesOptions}
          name="currency"
          control={control}
          placeholder={t('choose')}
        />
      </FieldWithLabel>
      <FieldWithLabel label={t('cardType')}>
        <SelectField
          options={cardTypes}
          name="cardType"
          control={control}
          placeholder={t('choose')}
        />
      </FieldWithLabel>
      <FieldWithLabel label={t('issueType')}>
        <SelectField
          options={issueTypes}
          name="issueType"
          control={control}
          placeholder={t('choose')}
        />
      </FieldWithLabel>
      <FieldWithLabel label={t('issuer')}>
        <SelectField
          options={cardIssuers}
          name="cardIssuer"
          control={control}
          placeholder={t('choose')}
        />
      </FieldWithLabel>
    </Stack>
  );
};
