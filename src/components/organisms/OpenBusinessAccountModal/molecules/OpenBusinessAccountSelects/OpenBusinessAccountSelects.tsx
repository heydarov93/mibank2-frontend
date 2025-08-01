import { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FieldWithLabel } from 'components/atoms';
import { SelectField } from 'components/molecules';
import { CARD_ISSUERS, ISSUE_TYPES } from 'constants/business/card';
import { SUPPORTED_CURRENCIES } from 'constants/data/currencies';
import { OpenBusinessAccFormValues } from 'hooks/business/useBusinessAccountFlow';

const currenciesOptions = SUPPORTED_CURRENCIES.map((value) => ({ value }));

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
          options={CARD_ISSUERS}
          name="cardIssuer"
          control={control}
          placeholder={t('selectIssuer')}
        />
      </FieldWithLabel>
      <FieldWithLabel label={t('cardType')}>
        <SelectField
          control={control}
          name="issueType"
          options={ISSUE_TYPES}
          placeholder={t('selectCardType')}
          onChange={handleIssueTypeChange}
          data-testid="card-type-select"
        />
      </FieldWithLabel>
    </Stack>
  );
};
