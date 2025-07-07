import { useTranslation } from 'react-i18next';

import {
  StyledInterestBox,
  StyledInterestLabel,
  StyledInterestText,
} from '../DepositCreationForm.styled';

import { calculateInterestAmount } from 'utils/helpers';


interface InterestInfoProps {
  amount?: number;
  interestRate?: number;
  currency?: string;
  term?: number;
}

const InterestInfo = ({
  amount,
  interestRate,
  currency,
  term,
}: InterestInfoProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
  const interestAmount = calculateInterestAmount(amount ?? 0, interestRate ?? 0);

  return (
    <StyledInterestBox data-testid="interest-info">
      <StyledInterestText>
        {interestAmount
          ? t('calcDetails', {
              term: term,
              interestRate: interestRate,
            })
          : t('calcInstruction')}
      </StyledInterestText>
      <StyledInterestLabel>
        {interestAmount
          ? `${currency} ${interestAmount}`
          : t('calcResultPlaceholder')}
      </StyledInterestLabel>
    </StyledInterestBox>
  );
};

export default InterestInfo;
