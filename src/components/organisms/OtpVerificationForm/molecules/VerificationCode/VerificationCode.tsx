import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledBoxContainer,
  StyledInputElement,
  StyledTypography,
  StyledVerificationBox,
} from './VerificationCode.styled';

import {
  CODE_RESET_TIMEOUT,
  DIGIT_NAVIGATION_TIMEOUT,
  ERROR_CLEAR_TIMEOUT,
  PASTE_ERROR_DISPLAY_TIMEOUT,
  PASTE_FOCUS_TIMEOUT,
} from 'constants/ui/layout';
import { OTP_INPUT_KEY } from 'constants/validation/otp';
import { useOtpInputController } from 'hooks';
import { TOtpInputKey } from 'types/types';

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

export const VerificationCode = ({
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
  const {
    otp,
    setOtp,
    inputRefs,
    focusInput,
    selectInput,
    blurInput,
    resetField,
  } = useOtpInputController(length);

  const [error, setError] = useState(false);
  const [isNonDigit, setIsNonDigit] = useState(false);

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
      handleNavigation(-1);
    };

    switch (event.key as TOtpInputKey) {
      case OTP_INPUT_KEY.Space:
        event.preventDefault();
        break;
      case OTP_INPUT_KEY.ArrowLeft:
        event.preventDefault();
        handleNavigation(-1);
        break;
      case OTP_INPUT_KEY.ArrowRight:
        event.preventDefault();
        handleNavigation(1);
        break;
      case OTP_INPUT_KEY.Delete:
      case OTP_INPUT_KEY.Backspace:
        event.preventDefault();
        handleDeletion();
        break;

      default:
        if (
          (event.ctrlKey || event.metaKey) &&
          (event.key === OTP_INPUT_KEY.Paste ||
            event.key === OTP_INPUT_KEY.Paste.toUpperCase())
        ) {
          break;
        }
        if (event.ctrlKey || event.metaKey) {
          break;
        }
        if (!/\d/.test(event.key)) {
          setError(true);
          setIsNonDigit(true);
          event.preventDefault();
          setTimeout(() => setError(false), ERROR_CLEAR_TIMEOUT);
          break;
        } else {
          setIsNonDigit(false);
        }

        setTimeout(() => handleNavigation(1), DIGIT_NAVIGATION_TIMEOUT);
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
    if (clipboardData.types.includes('text/plain')) {
      const pastedText = clipboardData.getData('text/plain');
      const pastedTextWithoutSymbols = pastedText.replace(/[^0-9]/g, '');
      if (!pastedText || /([a-zA-Zа-яА-Я])/g.test(pastedText)) {
        setError(true), setIsNonDigit(true);
        setTimeout(
          () => (setError(false), setIsNonDigit(false)),
          PASTE_ERROR_DISPLAY_TIMEOUT,
        );
        return;
      }

      const newArr = [...otp];
      for (let i = currentIndex; i < pastedTextWithoutSymbols.length; i++) {
        newArr[i] = pastedTextWithoutSymbols[i - currentIndex];
      }
      setOtp(newArr);

      setTimeout(() => {
        selectInput(
          currentIndex + pastedTextWithoutSymbols.length < length
            ? currentIndex + pastedTextWithoutSymbols.length
            : length - 1,
        );
        focusInput(
          currentIndex + pastedTextWithoutSymbols.length < length
            ? currentIndex + pastedTextWithoutSymbols.length
            : length - 1,
        );
      }, PASTE_FOCUS_TIMEOUT);
    }
  };

  useEffect(() => {
    if (isCodeWrong) {
      const timer = setTimeout(() => {
        resetField();
        onResetCodeWrong();
        queueMicrotask(() => focusInput(0));
      }, CODE_RESET_TIMEOUT);

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

  useEffect(() => {
    if (!isFormDisabled) {
      focusInput(0);
    }
  }, [isFormDisabled]);

  return (
    <StyledBoxContainer>
      <StyledVerificationBox className={error || isCodeWrong ? 'shake' : ''}>
        {otp.map((digit, index) => (
          <Fragment key={index}>
            <StyledInputElement
              type="tel"
              inputMode="numeric"
              data-testid={`otp-input-${index}`}
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
