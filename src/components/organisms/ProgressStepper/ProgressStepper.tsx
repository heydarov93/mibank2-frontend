import {
  StyledStep,
  StyledStepLabel,
  StyledStepper,
} from './ProgressStepper.styled';

type ProgressStepperProps = {
  steps: number[];
  activeStep: number;
};

export const ProgressStepper = ({
  steps,
  activeStep,
}: ProgressStepperProps) => {
  return (
    <StyledStepper activeStep={activeStep}>
      {steps.map((label, index) => (
        <StyledStep key={label}>
          <StyledStepLabel visible={index === activeStep}>
            {label}
          </StyledStepLabel>
        </StyledStep>
      ))}
    </StyledStepper>
  );
};
