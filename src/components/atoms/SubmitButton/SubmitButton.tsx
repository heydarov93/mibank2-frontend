import { StyledButton, StyledButtonContainer } from './SubmitButton.styled';

type SubmitButtonProps = {
  onClick: () => void;
  buttonContent: React.ReactNode;
  isDisabled?: boolean;
};

export const SubmitButton = ({
  onClick,
  buttonContent,
  isDisabled,
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
      >
        {buttonContent}
      </StyledButton>
    </StyledButtonContainer>
  );
};
