import { StyledButton, StyledButtonContainer } from './SecondaryButton.styled';

type SubmitButtonProps = {
  onClick?: () => void;
  buttonContent: React.ReactNode;
  isDisabled?: boolean;
};

export const SecondaryButton = ({
  onClick,
  buttonContent,
  isDisabled,
}: SubmitButtonProps) => {
  return (
    <StyledButtonContainer>
      <StyledButton
        size="large"
        variant="outlined"
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
