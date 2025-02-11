import React from 'react';

import { DigitInput } from './OneTimePasscodeForm.styled';

import { theme } from 'theme/theme';

interface OneTimePasscodeProps {
  otp: string[];
  handleChange: (value: string, index: number) => void;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  hasError: boolean;
}

const OneTimePasscode: React.FC<OneTimePasscodeProps> = ({
  otp,
  handleChange,
  handleKeyDown,
  inputRefs,
  hasError,
}) => {
  const getBackgroundColor = (value: string) => {
    if (hasError) return theme.palette.error.light;
    if (value) return theme.palette.primary.light;
    return 'transparent';
  };
  const getBorderColor = (value: string) => {
    if (hasError) return theme.palette.error.main;
    if (value) return theme.palette.primary.dark;
    return '';
  };
  return (
    <>
      {otp.map((value, index) => (
        <DigitInput
          key={index}
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e, index)
          }
          maxLength={1}
          ref={(element: HTMLInputElement | null) =>
            (inputRefs.current[index] = element)
          }
          sx={{
            backgroundColor: getBackgroundColor(value),
            borderColor: getBorderColor(value),
          }}
        />
      ))}
    </>
  );
};

export default OneTimePasscode;
