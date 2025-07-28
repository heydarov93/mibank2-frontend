import { ProgressStepper } from '../../../ProgressStepper/ProgressStepper';

import { EStepper } from 'enums/EStepper';

const steps = [1, 2, 3, 4];

interface FormStepperProps {
  step: EStepper;
}

export const FormStepper = ({ step }: FormStepperProps) => {
  return <ProgressStepper steps={steps} activeStep={step} />;
};
