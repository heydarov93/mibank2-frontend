import { useTranslation } from 'react-i18next';

import { DepositContainer } from './OpenDepositForm.styled';

import { DepositCreationForm } from 'components/molecules/DepositCreationForm/DepositCreationForm';
import { DepositSteps } from 'components/molecules/DepositSteps/DepositSteps';

export const OpenDepositForm = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
  const accounts = [t('account1'), t('account2')];
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
    <DepositContainer>
      <DepositSteps steps={steps} />
      <DepositCreationForm accounts={accounts} />
    </DepositContainer>
  );
};
