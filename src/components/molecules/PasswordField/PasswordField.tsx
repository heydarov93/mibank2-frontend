import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, KeyboardEvent, MouseEvent, SyntheticEvent } from 'react';
import {
  useController,
  Control,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputField } from 'components/atoms';
import { ISignupFormInput } from 'models/IAuth';

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  id: 'password' | 'confirmPassword';
  errors: FieldErrors<ISignupFormInput>;
  isFormDisabled?: boolean;
  onFocus?: () => void;
}

export const PasswordField = <T extends FieldValues>({
  control,
  name,
  id,
  errors,
  isFormDisabled,
  onFocus,
}: PasswordFieldProps<T>) => {
  const theme = useTheme();
  const { t } = useTranslation('translation');
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

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  };

  const onPaste = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const preventChange = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const helperText = (
    <>
      {capsLockOn && (
        <span>{`${t('LoginPage.password.capsLockWarning')} `}</span>
      )}
      {errors[id] && <span>{errors[id]?.message}</span>}
    </>
  );

  const passwordInputProps = {
    endAdornment: (
      <InputAdornment position="end">
        <Tooltip title={showPassword ? 'Hide' : 'Show'} placement="right">
          <span>
            <IconButton
              aria-label="toggle password visibility"
              sx={{ color: theme.palette.grey[300] }}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDown}
              edge="end"
              disabled={isFormDisabled}
            >
              {showPassword ? (
                <VisibilityOutlined />
              ) : (
                <VisibilityOffOutlined />
              )}
            </IconButton>
          </span>
        </Tooltip>
      </InputAdornment>
    ),
  };

  return (
    <InputField
      name={name}
      id={id}
      control={control}
      helperText={helperText}
      className={errors[id] ? 'shake' : ''}
      error={errors[id]}
      type={showPassword ? 'text' : 'password'}
      onCut={preventChange}
      onCopy={preventChange}
      placeholder="᛫᛫᛫᛫᛫᛫᛫᛫᛫"
      disabled={isFormDisabled}
      InputProps={passwordInputProps}
      onKeyUp={onKeyUpHandler}
      onFocus={onFocus}
      onKeyDown={onKeyDownHandler}
      onPaste={onPaste}
    />
  );
};
