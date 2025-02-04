import { FormControl, Select, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: string[];
  error?: { message?: string };
  disabled?: boolean;
}

const SelectField = <T extends FieldValues>({
  name,
  control,
  options,
  error,
  disabled = false,
}: SelectFieldProps<T>) => {
  return (
    <FormControl fullWidth error={!!error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select {...field} displayEmpty disabled={disabled}>
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
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

export default SelectField;
