import { useTranslation } from 'react-i18next';

import { StyledDepositContainer } from './OpenDepositRow.styled';

import { DepositCreationForm } from 'components/molecules';
import { DepositSteps } from 'components/molecules/DepositSteps/DepositSteps';
import { TCurrency } from 'types/types';

interface OpenDepositRowProps {
  onBack: () => void;
  depositId: number;
  depositCurrency: TCurrency;
  interestRate: number;
  term: number;
  depositName: string;
}

export const OpenDepositRow = ({
  onBack,
  depositName,
  depositId,
  term,
  interestRate,
  depositCurrency,
}: OpenDepositRowProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
  const steps = [
    {
      id: 1,
      title: t('chooseAmountStep'),
    },
    {
      id: 2,
      title: t('selectAccountStep'),
    },
    {
      id: 3,
      title: t('acceptTermsStep'),
    },
    {
      id: 4,
      title: t('openDepositStep'),
    },
  ];

  return (
    <StyledDepositContainer data-testid="deposit-container">
      <DepositSteps steps={steps} />
      <DepositCreationForm
        depositName={depositName}
        onBack={onBack}
        depositId={depositId}
        interestRate={interestRate}
        currency={depositCurrency}
        term={term}
        modal={false}
      />
    </StyledDepositContainer>
  );
};
