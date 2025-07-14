import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  StyledContainer,
  StyledHeader,
} from './DepositBenefitsGrid.styled';

import {
  BankIcon,
  ClockIcon,
  MoneyBagIcon,
  ShieldCheckIcon,
  ShieldIcon,
  SmileyFaceIcon,
} from 'components/atoms';
import { DepositBenefitsBox } from 'components/molecules';

export const DepositBenefitsGrid = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
  const DEPOSIT_BENEFITS = [
    {
      id: 1,
      icon: <MoneyBagIcon />,
      primaryText: t('attractiveInterestRate'),
      secondaryText: t('interestRateText'),
    },
    {
      id: 2,
      icon: <ClockIcon />,
      primaryText: t('shortTermGrowth'),
      secondaryText: t('shortTermGrowthText'),
    },
    {
      id: 3,
      icon: <ShieldIcon />,
      primaryText: t('secureRiskFree'),
      secondaryText: t('secureRiskFreeText'),
    },
    {
      id: 4,
      icon: <BankIcon />,
      primaryText: t('flexibleOptions'),
      secondaryText: t('flexibleOptionsText'),
    },
    {
      id: 5,
      icon: <SmileyFaceIcon />,
      primaryText: t('hassleFree'),
      secondaryText: t('hassleFreeText'),
    },
    {
      id: 6,
      icon: <ShieldCheckIcon />,
      primaryText: t('guaranteedPayout'),
      secondaryText: t('guaranteedPayoutText'),
    },
  ];

  return (
    <MainContainer>
      <StyledHeader>{t('depositBenefits')}</StyledHeader>
      <StyledContainer>
        {DEPOSIT_BENEFITS.map(({ icon, primaryText, secondaryText, id }) => (
          <DepositBenefitsBox
            key={id}
            primaryText={primaryText}
            secondaryText={secondaryText}
            icon={icon}
          />
        ))}
      </StyledContainer>
    </MainContainer>
  );
};
