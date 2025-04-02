import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  StyledContainer,
  StyledHeader,
} from './DepositBenefitsGrid.styled';

import {
  ClockIcon,
  ShieldCheckIcon,
  ShieldIcon,
  SmileyFaceIcon,
  BankIcon,
  MoneyBagIcon,
} from 'components/atoms';
import { DepositBenefitsBox } from 'components/molecules';

export const DepositBenefitsGrid = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });

  const depositBenefits = [
    {
      icon: <MoneyBagIcon />,
      mainText: t('attractiveInterestRate'),
      secondaryText: t('interestRateText'),
    },
    {
      icon: <ClockIcon />,
      mainText: t('shortTermGrowth'),
      secondaryText: t('shortTermGrowthText'),
    },
    {
      icon: <ShieldIcon />,
      mainText: t('secureRiskFree'),
      secondaryText: t('secureRiskFreeText'),
    },
    {
      icon: <BankIcon />,
      mainText: t('flexibleOptions'),
      secondaryText: t('flexibleOptionsText'),
    },
    {
      icon: <SmileyFaceIcon />,
      mainText: t('hassleFree'),
      secondaryText: t('hassleFreeText'),
    },
    {
      icon: <ShieldCheckIcon />,
      mainText: t('guaranteedPayout'),
      secondaryText: t('guaranteedPayoutText'),
    },
  ];

  return (
    <MainContainer>
      <StyledHeader>{t('depositBenefits')}</StyledHeader>
      <StyledContainer>
        {depositBenefits.map((item) => (
          <DepositBenefitsBox
            key={item.mainText}
            primaryHeader={item.mainText}
            secondaryText={item.secondaryText}
            svg={item.icon}
          />
        ))}
      </StyledContainer>
    </MainContainer>
  );
};
