import {
  StyledStep,
  StyledStepLabel,
  StyledStepper,
} from './ProgressStepper.styled';

interface ProgressStepperProps {
  steps: number[];
  activeStep: number;
}

export const ProgressStepper = ({
  steps,
  activeStep,
}: ProgressStepperProps) => {
  return (
    <StyledStepper
      data-active-step={activeStep}
      activeStep={activeStep}
      data-testid="stepper"
    >
      {steps.map((label, index) => (
        <StyledStep key={label} data-testid="step">
          <StyledStepLabel
            className={index === activeStep ? 'visible' : 'hidden'}
            data-testid="step-label"
          >
            {label}
          </StyledStepLabel>
        </StyledStep>
      ))}
    </StyledStepper>
  );
};
