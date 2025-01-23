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
}

const OneTimePasscode: React.FC<OneTimePasscodeProps> = ({
  otp,
  handleChange,
  handleKeyDown,
  inputRefs,
}) => {
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
            backgroundColor: value
              ? theme.palette.primary.light
              : 'transparent',
            borderColor: value ? theme.palette.primary.dark : '',
          }}
        />
      ))}
    </>
  );
};

export default OneTimePasscode;
