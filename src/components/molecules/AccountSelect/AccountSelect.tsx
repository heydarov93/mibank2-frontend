import { SelectProps, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SelectField } from 'components/molecules';
import { EAccount } from 'enums/EAccount';
import { useGetAccountOptions } from 'hooks/useGetAccountOptions';

interface AccountSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  withNewAccount?: boolean;
  onChange?: SelectProps<string | string[]>['onChange'];
}

export const AccountSelect = <T extends FieldValues>({
  control,
  name,
  withNewAccount,
  onChange,
}: AccountSelectProps<T>) => {
  const { isLoading, data } = useGetAccountOptions();
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });
  const accountOptions = useMemo(() => {
    if (isLoading) return [];

    return withNewAccount
      ? data.concat({ value: EAccount.NEW_ACCOUNT, label: t('openNewAcc') })
      : data;
  }, [data, withNewAccount, isLoading]);

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
        optionsLoading={isLoading}
        onChange={onChange}
      />
    </Stack>
  );
};
