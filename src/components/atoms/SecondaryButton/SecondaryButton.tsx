import { SxProps, Theme } from '@mui/material/styles';
import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledButton } from './SecondaryButton.styled';

interface SubmitButtonProps {
  onClick?: () => void;
  buttonContent: ReactNode;
  isDisabled?: boolean;
  sx?: SxProps<Theme>;
}

export const SecondaryButton = memo<SubmitButtonProps>(
  ({ onClick, buttonContent, isDisabled, sx, ...props }: SubmitButtonProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <StyledButton
        fullWidth
        sx={sx}
        size="large"
        variant="outlined"
        type="submit"
        onClick={onClick}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-label={t('label.submit')}
        {...props}
      >
        {buttonContent}
      </StyledButton>
    );
  },
);

SecondaryButton.displayName = 'SecondaryButton';
