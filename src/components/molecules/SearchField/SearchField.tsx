import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { StyledSearchField } from './SearchField.styled';

import { SEARCH_FIELD_MAX_LENGTH } from 'constants/ui/search';

interface SearchFieldProps {
  name: string;
  placeholder: string;
  control?: Control<FieldValues>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchField = ({
  name,
  placeholder,
  control,
  onKeyDown,
  ...props
}: SearchFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <StyledSearchField
          {...field}
          id={name}
          placeholder={placeholder}
          variant={'outlined'}
          onChange={(e) => field.onChange(e.target.value)}
          onKeyDown={onKeyDown}
          fullWidth
          InputProps={{
            startAdornment: <SearchIcon style={{ marginRight: 8 }} />,
            inputProps: {
              maxLength: SEARCH_FIELD_MAX_LENGTH,
            },
          }}
          {...props}
        />
      )}
    />
  );
};
