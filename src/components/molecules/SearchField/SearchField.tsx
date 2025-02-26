import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { StyledSearchField } from './SearchField.styled';

const SearchField = ({
  name,
  placeholder,
  control,
  ...props
}: {
  name: string;
  placeholder: string;
  control?: Control<FieldValues>;
}) => {
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
