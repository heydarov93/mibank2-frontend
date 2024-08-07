import { Fragment, useEffect, useRef, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledBoxContainer,
  StyledInputElement,
  StyledTypography,
  StyledVerificationBox,
} from './VerificationCode.styled';

interface VerificationCodeProps {
  separator: React.ReactNode;
  length: number;
  isCodeCorrect: boolean;
  isFormDisabled: boolean;
  isCodeWrong: boolean;
  onResetCodeWrong: () => void;
  onReady: (value: string) => void;
  shouldClearFields: boolean;
}

const VerificationCode = ({
  separator,
  length,
  isCodeCorrect,
  isFormDisabled,
  isCodeWrong,
  onResetCodeWrong,
  onReady,
  shouldClearFields,
}: VerificationCodeProps) => {
  const { t } = useTranslation('translation');

  const [error, setError] = useState(false);
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const [isNonDigit, setIsNonDigit] = useState(false);
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

    const handleDeletion = () => {
      const newArr = [...otp];
      newArr[currentIndex] = '';
      setOtp(newArr);
    };

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
      case 'Backspace':
        event.preventDefault();
        handleDeletion();
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
          setIsNonDigit(true);
          event.preventDefault();
          setTimeout(() => setError(false), 1000);
          break;
        } else {
          setIsNonDigit(false);
        }

        setTimeout(() => handleNavigation(1), 100);
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    const currentValue = event.target.value;
    if (!/\d/.test(currentValue)) return;

    const newArr = [...otp];
    newArr[currentIndex] = currentValue;
    setOtp(newArr);

    if (currentValue !== '') {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    currentIndex: number,
    disabled: boolean,
  ) => {
    if (disabled) return;
    selectInput(currentIndex);
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    currentIndex: number,
    disabled: boolean,
  ) => {
    event.preventDefault();
    if (disabled) return;
    const clipboardData = event.clipboardData;
    // Check if there is text data in the clipboard
    if (clipboardData.types.includes('text/plain')) {
      let pastedText = clipboardData.getData('text/plain');
      pastedText = pastedText.replace(/[^0-9]/g, '').substring(0, length);
      if (!pastedText) {
        setError(true);
        setTimeout(() => setError(false), 1000);
        return;
      }

      const newArr = [...otp];
      for (let i = currentIndex; i < pastedText.length; i++) {
        newArr[i] = pastedText[i - currentIndex];
      }
      setOtp(newArr);

      setTimeout(() => {
        selectInput(
          currentIndex + pastedText.length < length
            ? currentIndex + pastedText.length
            : length - 1,
        );
        focusInput(
          currentIndex + pastedText.length < length
            ? currentIndex + pastedText.length
            : length - 1,
        );
      }, 0);
    }
  };

  useEffect(() => {
    if (isCodeWrong) {
      const timer = setTimeout(() => {
        resetField();
        onResetCodeWrong();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isCodeWrong, resetField, onResetCodeWrong]);

  useEffect(() => {
    if (otp.every((i) => !!i)) onReady(otp.join(''));
  }, [otp]);

  useEffect(() => {
    if (shouldClearFields) {
      resetField();
    }
  }, [shouldClearFields]);

  return (
    <StyledBoxContainer>
      <StyledVerificationBox className={error || isCodeWrong ? 'shake' : ''}>
        {otp.map((digit, index) => (
          <Fragment key={index}>
            <StyledInputElement
              type="tel"
              inputMode="numeric"
              disabled={
                isFormDisabled || (index !== 0 && !otp[index - 1] && !digit)
              }
              disableUnderline
              className={digit ? 'hasValue' : ''}
              isCorrect={isCodeCorrect}
              slotProps={{
                input: { style: { textAlign: 'center' }, maxLength: 1 },
              }}
              inputRef={(el) => (inputRefs.current[index] = el)}
              onKeyDown={(event) =>
                handleKeyDown(
                  event as React.KeyboardEvent<HTMLInputElement>,
                  index,
                )
              }
              onChange={(event) =>
                handleChange(
                  event as React.ChangeEvent<HTMLInputElement>,
                  index,
                )
              }
              onClick={(event) =>
                handleClick(
                  event as React.MouseEvent<HTMLInputElement, MouseEvent>,
                  index,
                  isFormDisabled || (index !== 0 && !otp[index - 1] && !digit),
                )
              }
              onPaste={(event) =>
                handlePaste(
                  event as React.ClipboardEvent<HTMLInputElement>,
                  index,
                  isFormDisabled || (index !== 0 && !otp[index - 1] && !digit),
                )
              }
              placeholder="0"
              aria-label={`Digit ${index + 1} of Verification Code`}
              value={digit}
            />
            {index === length / 2 - 1 ? separator : null}
          </Fragment>
        ))}
      </StyledVerificationBox>
      {isNonDigit && (
        <StyledTypography>
          {t('VerificationPage.errorPattern')
            .split('\n')
            .map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            ))}
        </StyledTypography>
      )}
    </StyledBoxContainer>
  );
};

export const MemoizedVerificationCode = memo(VerificationCode);
