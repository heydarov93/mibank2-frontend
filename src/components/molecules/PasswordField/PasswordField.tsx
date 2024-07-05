import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, KeyboardEvent, MouseEvent, SyntheticEvent } from 'react';
import { useController, Control, FieldErrors } from 'react-hook-form';

import { InputField } from 'components/atoms';
import { IFormInput } from 'models/IAuth';

interface PasswordFieldProps {
  control: Control<IFormInput>;
  name: 'password';
  errors: FieldErrors<IFormInput>;
  isFormDisabled: boolean;
}

export const PasswordField = ({
  control,
  name,
  errors,
  isFormDisabled,
}: PasswordFieldProps) => {
  const theme = useTheme();
  const { field } = useController({
    name,
    control,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

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

  const helperText =
    (capsLockOn && 'Caps Lock is pressed!') || errors.password?.message;

  const passwordInputProps = {
    endAdornment: (
      <InputAdornment position="end">
        <Tooltip title={showPassword ? 'Hide' : 'Show'} placement="right">
          <IconButton
            aria-label="toggle password visibility"
            sx={{ color: theme.palette.grey[300] }}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDown}
            edge="end"
            disabled={isFormDisabled}
          >
            {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
          </IconButton>
        </Tooltip>
      </InputAdornment>
    ),
  };

  return (
    <InputField
      name="password"
      control={control}
      helperText={helperText}
      className={errors.password ? 'shake' : ''}
      error={errors.password}
      type={showPassword ? 'text' : 'password'}
      onCut={preventChange}
      onCopy={preventChange}
      placeholder="᛫᛫᛫᛫᛫᛫᛫᛫᛫"
      disabled={isFormDisabled}
      InputProps={passwordInputProps}
      onKeyUp={onKeyUpHandler}
    />
  );
};
