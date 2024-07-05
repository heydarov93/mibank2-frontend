import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, KeyboardEvent, MouseEvent, SyntheticEvent } from 'react';
import {
  useController,
  Control,
  Controller,
  FieldErrors,
} from 'react-hook-form';

import { StyledTextField } from 'components/organisms/LoginForm/LoginForm.styled';
import { IFormInput } from 'models/IAuth';

interface PasswordFieldProps {
  control: Control<IFormInput>;
  name: 'password';
  errors: FieldErrors<IFormInput>;
  isFormDisabled: boolean;
  capsLockOn: boolean;
  setCapsLockOn: (capsLockOn: boolean) => void;
}

export const PasswordField = ({
  control,
  name,
  errors,
  isFormDisabled,
  capsLockOn,
  setCapsLockOn,
}: PasswordFieldProps) => {
  const theme = useTheme();
  const { field } = useController({
    name,
    control,
  });

  const [showPassword, setShowPassword] = useState(false);

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (field.value) {
      const stringValue = field.value.replace(/[^a-zA-Z]/g, '');
      const capsLockIsOn =
        e.getModifierState('CapsLock') ||
        (stringValue.length > 1 && stringValue === field.value.toUpperCase());
      setCapsLockOn(capsLockIsOn);
    } else {
      setCapsLockOn(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const preventChange = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <StyledTextField
          fullWidth
          id="password"
          helperText={
            (capsLockOn && 'Caps Lock is pressed!') || errors.password?.message
          }
          className={errors.password ? 'shake' : ''}
          error={!!errors.password}
          type={showPassword ? 'text' : 'password'}
          onCut={preventChange}
          onCopy={preventChange}
          placeholder="᛫᛫᛫᛫᛫᛫᛫᛫᛫"
          disabled={isFormDisabled}
          {...field}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title={showPassword ? 'Hide' : 'Show'}
                  placement="right"
                >
                  <IconButton
                    aria-label="toggle password visibility"
                    sx={{ color: theme.palette.grey[300] }}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDown}
                    edge="end"
                    disabled={isFormDisabled}
                  >
                    {showPassword ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          onKeyUp={onKeyUpHandler}
        />
      )}
    />
  );
};
