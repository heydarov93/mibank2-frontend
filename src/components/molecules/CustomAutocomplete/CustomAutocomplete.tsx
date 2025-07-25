import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { SxProps, Theme } from '@mui/material/styles';

export interface CustomAutocompleteProps<T>
  extends Omit<AutocompleteProps<T, false, false, false>, 'renderInput'> {
  options: T[];
  placeholder?: string;
  getOptionLabel?: (option: T) => string;
  sx?: SxProps<Theme>;
  error?: boolean;
  helperText?: string;
}

export const CustomAutocomplete = <T,>({
  options,
  placeholder = 'Choose here',
  getOptionLabel = (option: T) => String(option),
  sx = {},
  error = false,
  helperText = '',
  ...rest
}: CustomAutocompleteProps<T>) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={getOptionLabel}
      sx={{
        borderRadius: '10px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          '&:hover:not(.Mui-focused)': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: `2px solid grey`,
            },
          },
        },
        ...sx,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
        />
      )}
      {...rest}
    />
  );
};

