import { Fragment, useRef, useState } from 'react';

import {
  StyledInputElement,
  StyledVerificationBox,
} from './VerificationCode.styled';
interface VerificationCodeProps {
  separator: React.ReactNode;
  length: number;
  value: string;
  isCodeCorrect: boolean;
  isFormDisabled: boolean;
  isCodeWrong: boolean;
  onChange: (value: string) => void;
}

export const VerificationCode = ({
  separator,
  length,
  value,
  isCodeCorrect,
  isFormDisabled,
  isCodeWrong,
  onChange,
}: VerificationCodeProps) => {
  const [error, setError] = useState(false);
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

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    const handleNavigation = (indexDelta: number) => {
      const newIndex = currentIndex + indexDelta;
      if (newIndex >= 0 && newIndex < length) {
        focusInput(newIndex);
        selectInput(newIndex);
      } else {
        blurInput(currentIndex);
      }
    };
    const handleDeletion = (prev: string) =>
      prev.slice(0, currentIndex) + prev.slice(currentIndex + 1);

    switch (event.key) {
      case ' ':
        event.preventDefault();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        handleNavigation(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        handleNavigation(1);
        break;
      case 'Delete':
        event.preventDefault();
        onChange(handleDeletion(value));
        break;
      case 'Backspace':
        event.preventDefault();
        handleNavigation(-1);
        onChange(handleDeletion(value));
        break;

      default:
        if (event.ctrlKey && (event.key === 'v' || event.key === 'V')) {
          break;
        }
        if (event.ctrlKey) {
          break;
        }
        if (!/\d/.test(event.key)) {
          setError(true);
          event.preventDefault();
          setTimeout(() => setError(false), 1000);
        }
        setTimeout(() => handleNavigation(1), 0);
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;
    if (!/\d/.test(currentValue)) return;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }

    const verificationArray = value.split('');
    const lastValue = currentValue[currentValue.length - 1];
    verificationArray[indexToEnter] = lastValue;
    const newValue = verificationArray.join('');

    onChange(newValue);

    if (currentValue !== '') {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    currentIndex: number,
  ) => {
    selectInput(currentIndex);
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes('text/plain')) {
      let pastedText = clipboardData.getData('text/plain');
      pastedText = pastedText
        .replace(/[^0-9]/g, '')
        .substring(0, length - value.length);
      let indexToEnter = 0;
      if (!pastedText) {
        setError(true);
        setTimeout(() => setError(false), 1000);
        return;
      }

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const verificationArr = value.split('');

      for (let i = indexToEnter; i < indexToEnter + pastedText.length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? '';
        verificationArr[i] = lastValue;
      }

      setTimeout(() => {
        selectInput(
          verificationArr.length < length
            ? verificationArr.length
            : verificationArr.length - 1,
        );
        focusInput(
          verificationArr.length < length
            ? verificationArr.length
            : verificationArr.length - 1,
        );
      }, 0);
      onChange(verificationArr.join(''));
    }
  };

  return (
    <StyledVerificationBox className={error || isCodeWrong ? 'shake' : ''}>
      {new Array(length).fill(null).map((_, index) => (
        <Fragment key={index}>
          <StyledInputElement
            disabled={isFormDisabled || index > value.length}
            disableUnderline
            className={value[index] ? 'hasValue' : ''}
            isCorrect={isCodeCorrect}
            slotProps={{ input: { style: { textAlign: 'center' } } }}
            inputRef={(el) => (inputRefs.current[index] = el!)}
            onKeyDown={(event) =>
              handleKeyDown(
                event as React.KeyboardEvent<HTMLInputElement>,
                index,
              )
            }
            onChange={(event) =>
              handleChange(event as React.ChangeEvent<HTMLInputElement>, index)
            }
            onClick={(event) =>
              handleClick(
                event as React.MouseEvent<HTMLInputElement, MouseEvent>,
                index,
              )
            }
            onPaste={(event) =>
              handlePaste(
                event as React.ClipboardEvent<HTMLInputElement>,
                index,
              )
            }
            placeholder="0"
            aria-label={`Digit ${index + 1} of Verification Code`}
            value={value[index] ?? ''}
          />
          {index === length / 2 - 1 ? separator : null}
        </Fragment>
      ))}
    </StyledVerificationBox>
  );
};
