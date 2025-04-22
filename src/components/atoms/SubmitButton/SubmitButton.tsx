import { Box } from '@mui/material';

import { StyledButton } from './SubmitButton.styled';

type SubmitButtonProps = {
  onClick?: () => void;
  buttonContent: React.ReactNode;
  isDisabled?: boolean;
  startIcon?: React.ReactNode;
};

export const SubmitButton = ({
  onClick,
  buttonContent,
  isDisabled,
  startIcon,
}: SubmitButtonProps) => {
  return (
    <Box>
      <StyledButton
        size="large"
        variant="contained"
        fullWidth
        type="submit"
        onClick={onClick}
        disabled={isDisabled}
        startIcon={startIcon}
        data-testid="save-button"
      >
        {buttonContent}
      </StyledButton>
    </Box>
  );
};
