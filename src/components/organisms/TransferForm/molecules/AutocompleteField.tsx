import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Autocomplete,
  autocompleteClasses,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { HTMLAttributes, useState } from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AccountInput } from './AccountInput';

interface AutocompleteFieldProps<
  Options extends { id: string; label: string },
  TField extends FieldValues,
> {
  control: Control<TField>;
  name: Path<TField>;
  options: Options[];
  textFieldProps?: TextFieldProps;
  format: string;
  error?: FieldError | undefined;
  renderOption?: (
    props: HTMLAttributes<HTMLLIElement>,
    option: Options,
  ) => React.ReactNode;
}

export function AutocompleteField<
  Options extends { id: string; label: string; number: string },
  TField extends FieldValues,
>(props: AutocompleteFieldProps<Options, TField>) {
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });
  const [open, setOpen] = useState(false);
  const { control, name, options, textFieldProps } = props;

  function handleOpenDropdown() {
    setOpen(true);
  }

  function handleCloseDropdown() {
    setOpen(false);
  }

  function handleToggleDropdown() {
    setOpen((v) => !v);
  }

  function getOptionLabel(option: Options | string): string {
    return typeof option === 'string' ? option : option.number;
  }

  const handleBlurFn = (onBlur: () => void) => () => {
    onBlur();
    handleCloseDropdown();
  };

  const handleChangeFn =
    (onChange: (v: string | typeof Option | null) => void) =>
    (event: React.SyntheticEvent, value: string | Options | null) =>
      onChange(
        value ? (typeof value === 'string' ? value : value.number) : null,
      );

  const getValue = (value: PathValue<TField, Path<TField>>) =>
    value ? options.find((option) => option.number === value) ?? null : null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value: formValue, ref, onBlur } }) => (
        <Autocomplete
          id={name}
          slotProps={{ popupIndicator: { onClick: handleToggleDropdown } }}
          popupIcon={
            options.length > 0 ? (
              <>
                <Typography component="span" fontSize="15px">
                  {options.find((option) => option.number === formValue)
                    ?.label ?? t('saved')}
                </Typography>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </>
            ) : null
          }
          forcePopupIcon
          renderOption={props.renderOption}
          value={getValue(formValue)}
          onChange={handleChangeFn(onChange)}
          onBlur={handleBlurFn(onBlur)}
          getOptionLabel={getOptionLabel}
          onFocus={handleOpenDropdown}
          open={open}
          options={options}
          sx={{
            [`& .${autocompleteClasses.popupIndicator}`]: {
              transform: 'none',
              height: '100%',
              borderRadius: 0,
              ':hover': {
                backgroundColor: 'transparent',
              },
            },
          }}
          freeSolo
          autoSelect
          handleHomeEndKeys
          openOnFocus={true}
          blurOnSelect={true}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={ref}
              error={!!props.error}
              helperText={props.error?.message}
              {...textFieldProps}
              InputProps={{
                ...params.InputProps,
                ...textFieldProps?.InputProps,
                sx: { borderRadius: '8px' },
                inputComponent: AccountInput as never,
              }}
              inputProps={{
                ...params?.inputProps,
                format: props.format,
              }}
            />
          )}
        />
      )}
    />
  );
}
