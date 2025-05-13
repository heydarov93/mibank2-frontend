import { SxProps, Theme } from '@mui/material';

import { StyledButton } from './SubmitButton.styled';

type SubmitButtonProps = {
  sx?: SxProps<Theme>;
  onClick?: () => void;
  buttonContent: React.ReactNode;
  isDisabled?: boolean;
  startIcon?: React.ReactNode;
} & React.ComponentProps<typeof StyledButton>;

export const SubmitButton = ({
  onClick,
  buttonContent,
  isDisabled,
  startIcon,
  ...props
}: SubmitButtonProps) => {
  return (
    <StyledButton
      size="large"
      variant="contained"
      fullWidth
      type="submit"
      onClick={onClick}
      disabled={isDisabled}
      startIcon={startIcon}
      data-testid="save-button"
      {...props}
    >
      {buttonContent}
    </StyledButton>
  );
};
