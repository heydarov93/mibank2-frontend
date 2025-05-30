import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  Stack,
  SelectProps,
} from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

import { ReactComponent as DoneIcon } from 'assets/icons/DoneIcon.svg';

export type SelectFieldOption = {
  value: string;
  label?: string;
  secondaryLabel?: string;
};

export type SelectFieldProps<T extends FieldValues> = Omit<
  SelectProps<SelectFieldOption['value']>,
  'error'
> & {
  name: Path<T>;
  control: Control<T>;
  options: SelectFieldOption[];
  error?: { message?: string };
  disabled?: boolean;
  placeholder?: string;
};

export const SelectField = <T extends FieldValues>({
  name,
  control,
  options,
  error,
  disabled = false,
  placeholder,
  onChange,
  ...selectProps
}: SelectFieldProps<T>) => {
  return (
    <FormControl fullWidth error={!!error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            displayEmpty
            disabled={disabled}
            onChange={(e, child) => {
              field.onChange(e);
              onChange?.(e, child);
            }}
            renderValue={(value) => {
              if (placeholder && !value) {
                return (
                  <Typography
                    sx={(theme) => ({
                      color: theme.palette.grey[300],
                      fontSize: 'inherit',
                    })}
                  >
                    {placeholder}
                  </Typography>
                );
              }

              const option = options.find((o) => o.value === value);

              return (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography sx={{ fontSize: 14 }}>
                    {option?.label ?? option?.value}
                  </Typography>
                  {option?.secondaryLabel && (
                    <Typography
                      sx={(theme) => ({
                        color: theme.palette.grey[400],
                        fontSize: 14,
                        mr: '4px',
                      })}
                    >
                      {option.secondaryLabel}
                    </Typography>
                  )}
                </Stack>
              );
            }}
            {...selectProps}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ width: '100%' }}
                >
                  <Typography sx={{ fontSize: 14 }}>
                    {option.label ?? option.value}
                  </Typography>
                  <Typography
                    sx={(theme) => ({
                      color:
                        option.value === field.value
                          ? theme.palette.primary.main
                          : theme.palette.grey[400],
                      fontSize: 14,
                    })}
                  >
                    {option.secondaryLabel}
                  </Typography>
                </Stack>
                {option.value === field.value && <DoneIcon />}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error?.message && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error.message}
        </Typography>
      )}
    </FormControl>
  );
};
