import { StyledButton, StyledButtonContainer } from './SubmitButton.styled';

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
    <StyledButtonContainer>
      <StyledButton
        size="large"
        variant="contained"
        fullWidth
        type="submit"
        onClick={onClick}
        disabled={isDisabled}
        startIcon={startIcon}
      >
        {buttonContent}
      </StyledButton>
    </StyledButtonContainer>
  );
};
