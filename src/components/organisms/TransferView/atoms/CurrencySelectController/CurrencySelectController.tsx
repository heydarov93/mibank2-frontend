import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { CurrencySelect } from 'components/molecules';

interface CurrencySelectControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export function CurrencySelectController<T extends FieldValues>({
  name,
  control,
}: CurrencySelectControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'PLN' as never}
      render={({ field }) => <CurrencySelect {...field} />}
    />
  );
}
