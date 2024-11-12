import { useSelector } from 'react-redux';

import { ProgressStepper } from '../ProgressStepper/ProgressStepper';

import { getStep } from 'store/selectors/StepperSelectors';

const steps = [1, 2, 3, 4];

export const MiBankStepper = () => {
  const step = useSelector(getStep);
  return <ProgressStepper steps={steps} activeStep={step} />;
};
