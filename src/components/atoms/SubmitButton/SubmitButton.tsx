import { SxProps, Theme } from '@mui/material';
import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledButton } from './SubmitButton.styled';

interface SubmitButtonProps {
  sx?: SxProps<Theme>;
  onClick?: () => void;
  buttonContent: ReactNode;
  isDisabled?: boolean;
  startIcon?: ReactNode;
  fullWidth?: boolean;
}

export const SubmitButton = memo<SubmitButtonProps>(
  ({
    onClick,
    buttonContent,
    isDisabled,
    startIcon,
    fullWidth = true,
    sx,
    ...props
  }: SubmitButtonProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <StyledButton
        sx={sx}
        size="large"
        type="submit"
        variant="contained"
        fullWidth={fullWidth}
        onClick={onClick}
        disabled={isDisabled}
        startIcon={startIcon}
        aria-disabled={isDisabled}
        aria-label={t('label.submit')}
        data-testid="save-button"
        {...props}
      >
        {buttonContent}
      </StyledButton>
    );
  },
);

SubmitButton.displayName = 'SubmitButton';
