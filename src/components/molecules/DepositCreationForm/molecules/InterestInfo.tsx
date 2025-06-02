import { useTranslation } from 'react-i18next';

import {
  StyledInterestBox,
  StyledInterestLabel,
  StyledInterestText,
} from '../DepositCreationForm.styled';

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
  const interestAmount =
    amount && interestRate ? ((amount * interestRate) / 100).toFixed(2) : null;

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
        {interestAmount ? `${currency} ${interestAmount}` : t('calcResultPlaceholder')}
      </StyledInterestLabel>
    </StyledInterestBox>
  );
};

export default InterestInfo;
