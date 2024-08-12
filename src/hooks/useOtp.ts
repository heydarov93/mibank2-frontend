import { useState, useRef } from 'react';

export const useOtp = (length: number) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>(new Array(length).fill(null));

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const blurInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.blur();
  };

  const resetField = () => {
    setOtp(new Array(length).fill(''));
  };

  return {
    otp,
    setOtp,
    inputRefs,
    focusInput,
    selectInput,
    blurInput,
    resetField,
  };
};
