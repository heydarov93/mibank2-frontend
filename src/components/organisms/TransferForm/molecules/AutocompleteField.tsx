import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Autocomplete,
  autocompleteClasses,
  AutocompleteProps,
  Grow,
  Paper,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PatternInput } from 'components/molecules';

interface AutocompleteFieldProps<
  Options extends { id: string; label: string },
  TField extends FieldValues,
> extends Partial<AutocompleteProps<Options, false, false, true>> {
  control: Control<TField>;
  name: Path<TField>;
  options: Options[];
  textFieldProps?: TextFieldProps;
  pattern: string;
}

export function AutocompleteField<
  Options extends { id: string; label: string; number: string },
  TField extends FieldValues,
>(props: AutocompleteFieldProps<Options, TField>) {
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });
  const [open, setOpen] = useState(false);
  const { control, name, options, textFieldProps, pattern } = props;

  // function handleOpenDropdown() {
  //   setOpen(true);
  // }

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

  function PopupIcon({
    selectedValue,
  }: {
    selectedValue: PathValue<TField, Path<TField>>;
  }) {
    return (
      <>
        <Typography component="span" fontSize="15px">
          {options.find((option) => option.number === selectedValue)?.label ??
            t('saved')}
        </Typography>
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </>
    );
  }

  const autocompleteSx = {
    [`& .${autocompleteClasses.popupIndicator}`]: {
      transform: 'none',
      height: '100%',
      borderRadius: 0,
      ':hover': {
        backgroundColor: 'transparent',
      },
    },
  };

  const paperSx = (theme: Theme) => ({
    borderRadius: theme.spacing(1),
    boxShadow: `0 4px 12px ${theme.palette.shadow.shadowLight}`,
    border: `1px solid ${theme.palette.border.lightBlue}`,
    marginTop: theme.spacing(0.5),
    '& .MuiAutocomplete-option': {
      paddingBlock: `${theme.spacing(1)} !important`,
      '&:hover': {
        backgroundColor: `${theme.palette.primary.light} !important`,
      },
      '&:active': {
        backgroundColor: `${theme.palette.primary.main} !important`,
        color: 'common.white',
      },
    },
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value: formValue, ref, onBlur } }) => (
        <Autocomplete
          PaperComponent={(props) => (
            <Grow in style={{ transformOrigin: 'top center' }}>
              <Paper {...props} sx={paperSx} />
            </Grow>
          )}
          id={name}
          slotProps={{
            popupIndicator: { onClick: handleToggleDropdown },
          }}
          ListboxProps={{ sx: { paddingBlock: 0 } }}
          popupIcon={
            options.length > 0 && <PopupIcon selectedValue={formValue} />
          }
          forcePopupIcon
          value={getValue(formValue)}
          onChange={handleChangeFn(onChange)}
          onBlur={handleBlurFn(onBlur)}
          renderOption={props.renderOption}
          getOptionLabel={getOptionLabel}
          getOptionDisabled={props.getOptionDisabled}
          // onFocus={handleOpenDropdown}
          open={open}
          options={options}
          sx={autocompleteSx}
          freeSolo
          autoSelect
          handleHomeEndKeys
          // openOnFocus={true}
          blurOnSelect={true}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={ref}
              {...textFieldProps}
              InputProps={{
                ...params.InputProps,
                ...textFieldProps?.InputProps,
                sx: { borderRadius: '8px', ...textFieldProps?.InputProps?.sx },
                inputComponent: PatternInput as never,
              }}
              inputProps={{
                ...params?.inputProps,
                format: pattern,
              }}
              sx={(theme) => ({
                fieldset: {
                  border: `1px solid ${theme.palette.border.lightBlue}`,
                },
              })}
            />
          )}
        />
      )}
    />
  );
}
