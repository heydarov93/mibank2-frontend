import { SelectChangeEvent, Stack, SxProps, Theme } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SelectField } from '..';

import { FieldWithLabel } from 'components/atoms';
import { CURRENCIES } from 'constants/currencies';
import { OpenBusinessAccFormValues } from 'hooks/useOpenBusinessAccFlow';

const currenciesOptions = CURRENCIES.map((value) => ({ value }));
const cardIssuers = [{ value: 'Visa' }, { value: 'MasterCard' }];
const issueTypes = [
  { value: 'digital', label: 'Digital' },
  { value: 'plastic', label: 'Plastic' },
];

interface OpenBusinessAccountSelectsProps {
  sx?: SxProps<Theme>;
}

export const OpenBusinessAccountSelects = ({
  sx,
}: OpenBusinessAccountSelectsProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OpenBusinessAccountModal',
  });
  const { control, setValue } = useFormContext<OpenBusinessAccFormValues>();

  function handleIssueTypeChange(
    e: SelectChangeEvent<string | number | string[]>,
  ) {
    const issueType = e.target.value;
    setValue('addressConfirmed', issueType === 'digital', {
      shouldValidate: true,
    });
  }

  return (
    <Stack gap={2.5} sx={sx}>
      <FieldWithLabel label={t('currency')}>
        <SelectField
          control={control}
          name="currency"
          options={currenciesOptions}
          placeholder={t('selectCurrency')}
        />
      </FieldWithLabel>
      <FieldWithLabel label={t('cardIssuer')}>
        <SelectField
          options={cardIssuers}
          name="cardIssuer"
          control={control}
          placeholder={t('selectIssuer')}
        />
      </FieldWithLabel>
      <FieldWithLabel label={t('cardType')}>
        <SelectField
          control={control}
          name="issueType"
          options={issueTypes}
          placeholder={t('selectCardType')}
          onChange={handleIssueTypeChange}
          data-testid="card-type-select"
        />
      </FieldWithLabel>
    </Stack>
  );
};
