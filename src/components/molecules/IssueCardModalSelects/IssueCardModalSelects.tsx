import { Stack, SxProps, Theme } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FieldWithLabel } from 'components/atoms';
import { AccountSelect, SelectField } from 'components/molecules';
import { CardIssueFormValues } from 'components/organisms/IssueCardModal/IssueCardModal';
import currencies from 'constants/currencies';

const currenciesOptions = currencies.map((value) => ({ value }));

const cardTypes = [
  { value: 'Debit', label: 'Debit Card' },
  { value: 'Credit', label: 'Credit Card (NOT IN MVP)' },
];

const issueTypes = [{ value: 'Digital' }, { value: 'Plastic' }];

const cardIssuers = [{ value: 'Visa' }, { value: 'MasterCard' }];

interface IssueCardModalSelectsProps {
  sx?: SxProps<Theme>;
}

export const IssueCardModalSelects = ({ sx }: IssueCardModalSelectsProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });
  const { control } = useFormContext<CardIssueFormValues>();

  return (
    <Stack gap={2.5} sx={sx}>
      <AccountSelect name="issuanceAccount" control={control} withNewAccount />
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
