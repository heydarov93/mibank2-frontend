import { Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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

export const IssueCardModalSelects = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });
  const { control } = useFormContext<CardIssueFormValues>();

  return (
    <Stack spacing="20px" mt="24px">
      <AccountSelect name="issuanceAccount" control={control} withNewAccount />

      <Stack spacing="4px">
        <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
          {t('currency')}
        </Typography>
        <SelectField
          options={currenciesOptions}
          name="currency"
          control={control}
          placeholder={t('choose')}
        />
      </Stack>

      <Stack spacing="4px">
        <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
          {t('cardType')}
        </Typography>
        <SelectField
          options={cardTypes}
          name="cardType"
          control={control}
          placeholder={t('choose')}
        />
      </Stack>

      <Stack spacing="4px">
        <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
          {t('issueType')}
        </Typography>
        <SelectField
          options={issueTypes}
          name="issueType"
          control={control}
          placeholder={t('choose')}
        />
      </Stack>

      <Stack spacing="4px">
        <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
          {t('issuer')}
        </Typography>
        <SelectField
          options={cardIssuers}
          name="cardIssuer"
          control={control}
          placeholder={t('choose')}
        />
      </Stack>
    </Stack>
  );
};
