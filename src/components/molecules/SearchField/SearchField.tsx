import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledSearchField } from './SearchField.styled';

const SearchField = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const { control } = useForm();

  return (
    <Controller
      name="productSearch"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <StyledSearchField
          {...field}
          id="productSearch"
          placeholder={t('header.searchProducts')}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: <SearchIcon style={{ marginRight: 8 }} />,
          }}
        />
      )}
    />
  );
};

export default SearchField;
