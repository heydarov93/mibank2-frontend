import { useTranslation } from 'react-i18next';

import { DepositStep } from '../DepositStep/DepositStep';

import {
  StepsFooterText,
  StepsHeader,
  StepsContainer,
  StepsRowContainer,
} from './DepositSteps.styled';

import { IDepositStep } from 'components/organisms/OpenDepositRow/OpenDepositRow';


export interface DepositStepsProps {
  openDepositSteps: IDepositStep[];
}

export const DepositSteps = ({ openDepositSteps }: DepositStepsProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });

  return (
    <StepsContainer>
      <StepsHeader>{t('howToOpenDeposit')}</StepsHeader>
      <StepsRowContainer>
        {openDepositSteps.map(({ id, title }) => (
          <DepositStep id={id} title={title} key={id} />
        ))}
      </StepsRowContainer>
      <StepsFooterText>{t('completionMessage')}</StepsFooterText>
    </StepsContainer>
  );
};
