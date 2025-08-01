import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import Select, { SelectProps } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { useRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { ReactComponent as DoneIconSVG } from 'assets/icons/DoneIcon.svg';
import { useDisclosure } from 'hooks';
import { ISelectFieldOption } from 'models/ISelectField';

export type OptionType = 'checkbox' | 'radio';

export type SelectFieldProps<T extends FieldValues> = Omit<
  SelectProps<ISelectFieldOption['value'][] | ISelectFieldOption['value']>,
  'error'
> & {
  name: Path<T>;
  control: Control<T>;
  options: ISelectFieldOption[];
  error?: { message?: string };
  disabled?: boolean;
  placeholder?: string;
  optionsLoading?: boolean;
  optionType?: OptionType;
  containerSx?: SxProps<Theme>;
  menuSx?: SxProps<Theme>;
  openedColor?: string;
};

export const SelectField = <T extends FieldValues>({
  name,
  control,
  options,
  error,
  disabled = false,
  placeholder,
  optionsLoading,
  sx,
  containerSx,
  menuSx,
  openedColor,
  onChange,
  optionType,
  ...selectProps
}: SelectFieldProps<T>) => {
  const { field } = useController({ name, control });
  const selectState = useDisclosure();
  const valueColor = selectState.isOpen ? openedColor : undefined;
  const selectedOptionRef = useRef<ISelectFieldOption | undefined>();

  selectedOptionRef.current = options.find(
    (option) => option.value === field.value,
  );

  const selectedOption = selectedOptionRef.current;

  function handleClose(e: React.SyntheticEvent) {
    setTimeout(() => {
      const target = e.target as HTMLElement;
      const option = selectedOptionRef.current;
      const isClickedOutside = !target.closest('.prevent-closing-item');

      if (!option?.preventClosing || isClickedOutside) {
        selectState.close();
      }
    });
  }

  return (
    <FormControl fullWidth error={!!error} sx={containerSx}>
      <Select
        {...field}
        displayEmpty
        disabled={disabled}
        multiple={optionType === 'checkbox'}
        open={selectState.isOpen}
        onOpen={selectState.open}
        onClose={handleClose}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          slotProps: {
            paper: {
              sx: {
                overflow: 'auto',
                ul: {
                  width: 'fit-content',
                  minWidth: 'inherit',
                  height: '100%',
                },
                ...menuSx,
              },
            },
          },
        }}
        onChange={(e, child) => {
          field.onChange(e);
          onChange?.(e, child);
        }}
        sx={{
          height: '100%',
          '.MuiSelect-icon': { fill: valueColor },
          ...sx,
        }}
        renderValue={(value) => {
          if (
            placeholder &&
            (!value || (Array.isArray(value) && value.length === 0))
          ) {
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

          if (!Array.isArray(value)) {
            const option = options.find((o) => o.value === value);

            return (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ color: valueColor }}
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
          }

          const selectedLabels = options
            .filter((o) => value.includes(o.value))
            .map((o) => o.label ?? o.value)
            .join(', ');

          return (
            <Typography sx={{ fontSize: 14, color: valueColor }}>
              {selectedLabels}
            </Typography>
          );
        }}
        {...selectProps}
      >
        {optionsLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 1.5,
            }}
          >
            <CircularProgress size={24} />
          </Box>
        ) : (
          options.map((option, index) => (
            <MenuItem
              key={index}
              value={option.value}
              className={
                option.preventClosing ? 'prevent-closing-item' : undefined
              }
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent={optionType ? 'flex-start' : 'space-between'}
                gap={optionType ? '6px' : ''}
                sx={{ width: '100%' }}
              >
                {optionType === 'radio' ? (
                  <Radio
                    checked={option.value === field.value}
                    sx={{ padding: 0 }}
                  />
                ) : optionType === 'checkbox' ? (
                  <Checkbox
                    checked={field.value.includes(option.value)}
                    sx={{ padding: 0 }}
                  />
                ) : (
                  ''
                )}
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
              {optionType
                ? null
                : option.value === field.value && <DoneIconSVG />}
            </MenuItem>
          ))
        )}
        {selectedOption?.renderMenuExtender && (
          <Box
            component="li"
            sx={{ position: 'absolute', left: '100%', top: 0, height: '100%' }}
          >
            {selectedOption.renderMenuExtender({ onClose: selectState.close })}
          </Box>
        )}
      </Select>
      {error?.message && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error.message}
        </Typography>
      )}
    </FormControl>
  );
};
