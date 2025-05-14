import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SelectField, SelectFieldOption } from 'components/molecules';

interface AccountSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  withNewAccount?: boolean;
}

const mockAccounts: SelectFieldOption[] = [
  {
    value: 'Option 1',
    label: 'PL12 1116 6660 0000 0001 2345 678',
    secondaryLabel: 'PLN 100,00 ',
  },
  {
    value: 'Option 2',
    label: 'PL12 1116 6660 0000 0001 2345 678',
    secondaryLabel: 'USD 100,00 ',
  },
  {
    value: 'Option 3',
    label: 'PL12 1116 6660 0000 0001 2345 678',
    secondaryLabel: 'EUR 100,00 ',
  },
];

export const AccountSelect = <T extends FieldValues>({
  control,
  name,
  withNewAccount,
}: AccountSelectProps<T>) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });
  const accountOptions = useMemo(
    () =>
      withNewAccount
        ? mockAccounts.concat({ value: 'newAcc', label: t('openNewAcc') })
        : mockAccounts,
    [withNewAccount],
  );

  return (
    <Stack spacing="4px">
      <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
        {t('selectAcc')}
      </Typography>
      <SelectField
        options={accountOptions}
        name={name}
        control={control}
        placeholder={t('choose')}
      />
    </Stack>
  );
};
