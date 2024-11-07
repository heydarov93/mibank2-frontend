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
          <StyledStepLabel
            className={index === activeStep ? 'visible' : 'hidden'}
          >
            {label}
          </StyledStepLabel>
        </StyledStep>
      ))}
    </StyledStepper>
  );
};
