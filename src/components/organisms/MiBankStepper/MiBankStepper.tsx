import { ProgressStepper } from '../ProgressStepper/ProgressStepper';

import { EStepper } from 'enums/EStepper';

const steps = [1, 2, 3, 4];

interface MiBankStepperProps {
  step: EStepper;
}

export const MiBankStepper = ({ step }: MiBankStepperProps) => {
  return <ProgressStepper steps={steps} activeStep={step} />;
};
