import { Box } from '@mui/material';
import { Fragment, useEffect, useRef, useState } from 'react';

import {
  StyledInputElement,
  StyledVerificationBox,
} from './VerificstionField.styled';

const VerificationCode = ({
  separator,
  length,
  value,
  onChange,
  isFormDisabled,
}: {
  separator: React.ReactNode;
  length: number;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  isFormDisabled: boolean;
}) => {
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

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    const handleNavigation = (indexDelta: number) => {
      const newIndex = currentIndex + indexDelta;
      if (newIndex >= 0 && newIndex < length) {
        focusInput(newIndex);
        selectInput(newIndex);
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
        onChange((prev) => handleDeletion(prev));
        break;
      case 'Backspace':
        event.preventDefault();
        handleNavigation(-1);
        onChange((prev) => handleDeletion(prev));
        break;

      default:
        if (!/\d/.test(event.key)) {
          setError(true);
          event.preventDefault();
          setTimeout(() => setError(false), 1000);
        }
        setTimeout(() => {
          handleNavigation(1);
        }, 0);
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
    onChange((prev) => {
      const verificationArray = prev.split('');
      const lastValue = currentValue[currentValue.length - 1];
      verificationArray[indexToEnter] = lastValue;
      return verificationArray.join('');
    });
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
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;
      if (!/^\d+$/.test(pastedText)) return;

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

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? ' ';
        verificationArr[i] = lastValue;
      }

      onChange(verificationArr.join(''));
    }
  };

  return (
    <StyledVerificationBox className={error ? 'shake' : ''}>
      {new Array(length).fill(null).map((_, index) => (
        <Fragment key={index}>
          <StyledInputElement
            disabled={isFormDisabled || index > value.length}
            disableUnderline
            className={value[index] ? 'hasValue' : ''}
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

interface VerificationInputsProps {
  isFormDisabled: boolean;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export const VerificationInputs = ({
  isFormDisabled,
  onChange,
  value,
}: VerificationInputsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 2,
      }}
    >
      <VerificationCode
        separator={<span>-</span>}
        value={value}
        onChange={onChange}
        isFormDisabled={isFormDisabled}
        length={6}
      />
    </Box>
  );
};
