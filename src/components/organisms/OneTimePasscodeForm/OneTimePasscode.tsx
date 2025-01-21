import React, { useState } from 'react';

import { DigitInput } from './OneTimePasscodeForm.styled';

const OneTimePasscode = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      document.getElementById(`digit-${index + 1}`)?.focus();
    }
  };
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        document.getElementById(`digit-${index - 1}`)?.focus();
      }
    }
  };

  return (
    <>
      {otp.map((value, index) => (
        <DigitInput
          key={index}
          id={`digit-${index}`}
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e, index)
          }
          inputProps={{
            maxLength: 1,
          }}
        />
      ))}
    </>
  );
};

export default OneTimePasscode;
