import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { StyledSearchField } from './SearchField.styled';

interface SearchFieldProps {
  name: string;
  placeholder: string;
  control?: Control<FieldValues>;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField = ({
  name,
  placeholder,
  control,
  onSearchChange,
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
          onChange={onSearchChange}
          fullWidth
          InputProps={{
            startAdornment: <SearchIcon style={{ marginRight: 8 }} />,
          }}
          {...props}
        />
      )}
    />
  );
};

export default SearchField;
