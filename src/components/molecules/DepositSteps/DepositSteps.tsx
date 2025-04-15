import { useTranslation } from 'react-i18next';

import { DepositStep } from '../DepositStep/DepositStep';

import {
  StepsFooterText,
  StepsHeader,
  StepsContainer,
  StepsRowContainer,
} from './DepositSteps.styled';

export interface StepItem {
  id: number;
  title: string;
}

export interface DepositStepsProps {
  steps: StepItem[];
}

export const DepositSteps = ({ steps }: DepositStepsProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });

  return (
    <StepsContainer>
      <StepsHeader>{t('howToOpenDeposit')}</StepsHeader>
      <StepsRowContainer>
        {steps.map(({ id, title }) => (
          <DepositStep id={id} title={title} key={id} />
        ))}
      </StepsRowContainer>
      <StepsFooterText>{t('completionMessage')}</StepsFooterText>
    </StepsContainer>
  );
};
