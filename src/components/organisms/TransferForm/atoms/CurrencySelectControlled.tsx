import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { CurrencySelect } from 'components/molecules';

interface CurrencySelectControlledProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export function CurrencySelectControlled<T extends FieldValues>({
  name,
  control,
}: CurrencySelectControlledProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'PLN' as never}
      render={({ field }) => <CurrencySelect {...field} />}
    />
  );
}
