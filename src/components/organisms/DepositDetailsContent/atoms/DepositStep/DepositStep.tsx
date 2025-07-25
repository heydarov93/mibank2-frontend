import {
  DashedLine,
  StepCircle,
  StepRow,
  StepStack,
  StepText,
} from './DepositStep.styled';

interface DepositStepProps {
  id: number;
  title: string;
}

const LAST_STEP_INDEX = 4;

export const DepositStep = ({ id, title }: DepositStepProps) => (
  <StepRow>
    <StepStack>
      <StepCircle>{id}</StepCircle>
      {id < LAST_STEP_INDEX && <DashedLine />}
    </StepStack>
    <StepText>{title}</StepText>
  </StepRow>
);
