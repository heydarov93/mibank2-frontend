import { ProgressStepper } from '../ProgressStepper/ProgressStepper';

const steps = [1, 2, 3, 4];

export const AutoQCStepper = () => {
  return <ProgressStepper steps={steps} activeStep={1} />;
};
