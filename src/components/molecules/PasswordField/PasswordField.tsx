import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, Tooltip } from '@mui/material';
import { useState, KeyboardEvent, MouseEvent, SyntheticEvent } from 'react';
import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledLabel } from './PasswordField.styled';

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
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.form.field.password',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const capsLockIsOn = e.getModifierState('CapsLock');
    setCapsLockOn(capsLockIsOn);
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
      {capsLockOn && <span>{`${t('error.capsLockWarning')} `}</span>}
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
              sx={(theme) => ({ color: theme.palette.grey[300] })}
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
    <>
      <Box display="flex">
        <StyledLabel htmlFor={id}>
          {t(name === 'password' ? 'mainLabel' : 'confirmLabel')}
        </StyledLabel>
      </Box>
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
        placeholder="᛫᛫᛫᛫᛫᛫᛫᛫᛫᛫"
        disabled={isFormDisabled}
        InputProps={passwordInputProps}
        onKeyUp={onKeyUpHandler}
        onFocus={onFocus}
        onKeyDown={onKeyDownHandler}
        onPaste={onPaste}
      />
    </>
  );
};
