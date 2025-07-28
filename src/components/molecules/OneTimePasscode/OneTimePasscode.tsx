import React from 'react';

import { DigitInput } from './OneTimePasscode.styled';

import { getBackgroundColor, getBorderColor } from 'utils/helpers';

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

export const OneTimePasscode: React.FC<OneTimePasscodeProps> = ({
  otp,
  handleChange,
  handleKeyDown,
  inputRefs,
  hasError,
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
            backgroundColor: getBackgroundColor(value, hasError),
            borderColor: getBorderColor(value, hasError),
          }}
        />
      ))}
    </>
  );
};

