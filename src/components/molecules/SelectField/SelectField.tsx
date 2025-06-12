import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  Stack,
  SelectProps,
  CircularProgress,
  SxProps,
  Theme,
  Box,
} from '@mui/material';
import { useRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { ReactComponent as DoneIcon } from 'assets/icons/DoneIcon.svg';
import useDisclosure from 'hooks/useDisclosure';

export type SelectFieldOption = {
  value: string;
  label?: string;
  secondaryLabel?: string;
  preventClosing?: boolean;
  renderMenuExtender?: (params: { onClose: () => void }) => React.ReactNode;
  onClick?: () => void;
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
  optionsLoading?: boolean;
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
  ...selectProps
}: SelectFieldProps<T>) => {
  const { field } = useController({ name, control });
  const selectState = useDisclosure();
  const valueColor = selectState.isOpen ? openedColor : undefined;
  const selectedOptionRef = useRef<SelectFieldOption | undefined>();

  selectedOptionRef.current = options.find(
    (option) => option.value === field.value,
  );

  const selectedOption = selectedOptionRef.current;

  function handleClose(e: React.SyntheticEvent) {
    // setTimeout is used to get current value after React has finished updating the state
    // Otherwise it will reference to previous selected option
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
