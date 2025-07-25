import { Autocomplete, Box, TextField } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledLabel } from '../../DepositCreationForm.styled';
import { AccountItem } from '../AccountItem/AccountItem';

import { AccountOption, DepositFormValues } from 'models/IDepositInfo';

interface AccountSelectProps {
  control: Control<DepositFormValues>;
  errors: FieldErrors<DepositFormValues>;
  options: AccountOption[];
  isLoading: boolean;
}

const AccountSelect = ({
  control,
  errors,
  options,
  isLoading,
}: AccountSelectProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });

  return (
    <Box sx={{ marginBottom: '24px' }}>
      <StyledLabel>{t('selectAccountLabel')}</StyledLabel>
      <Controller
        name="account"
        control={control}
        render={({ field }) => (
          <Autocomplete
            data-testid="account-select"
            loading={isLoading}
            options={options}
            getOptionLabel={(option: AccountOption) =>
              `${option.iban} ${option.currency} ${option.balance}`
            }
            value={
              options.find((acc: AccountOption) => acc.iban === field.value) ||
              null
            }
            onChange={(_, selected) => field.onChange(selected?.iban || '')}
            renderOption={(props, option, { selected }) => (
              <AccountItem
                selected={selected}
                props={props}
                option={option}
                key={option.iban}
              />
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={t('selectAccountLabel')}
                error={!!errors.account}
                helperText={errors.account?.message}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
              />
            )}
            sx={{
              '& .MuiAutocomplete-paper': {
                borderRadius: '10px',
                maxHeight: '200px',
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default AccountSelect;
