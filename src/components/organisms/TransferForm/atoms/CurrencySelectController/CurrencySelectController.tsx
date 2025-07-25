import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CurrencySelect } from 'components/molecules';

interface CurrencySelectControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export function CurrencySelectController<T extends FieldValues>({
  name,
  control,
}: CurrencySelectControllerProps<T>) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Accessibility',
  });

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'PLN' as never}
      render={({ field }) => (
        <CurrencySelect {...field} aria-label={t('label.currencySelector')} />
      )}
    />
  );
}
