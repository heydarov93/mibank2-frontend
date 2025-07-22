import { DepositBenefitsGrid } from '../DepositBenefitsGrid/DepositBenefitsGrid';
import { DepositLearnMoreDetails } from '../DepositLearnMoreDetails/DepositLearnMoreDetails';
import { DepositLearnMoreHeader } from '../DepositLearnMoreHeader/DepositLearnMoreHeader';
import { DepositLearnMoreOverview } from '../DepositLearnMoreOverview/DepositLearnMoreOverview';
import { OpenDepositRow } from '../OpenDepositRow/OpenDepositRow';

import { StyledContainer } from './DepositLearnMoreContent.styled';

import { IDeposit } from 'models/IDepositInfo';

interface DepositLearnMoreContentProps {
  deposit: IDeposit;
  imageSrc: string;
  onOpenForm: () => void;
  onBack: () => void;
  onOpenDeposit: (deposit: IDeposit) => void;
}

export const DepositLearnMoreContent = ({
  deposit,
  imageSrc,
  onOpenForm,
  onBack,
  onOpenDeposit,
}: DepositLearnMoreContentProps) => (
  <>
    <DepositLearnMoreHeader onBack={onBack} label={deposit.name} />
    <StyledContainer>
      <DepositLearnMoreOverview
        deposit={deposit}
        imageSrc={imageSrc}
        onOpenForm={onOpenForm}
      />
      <DepositLearnMoreDetails
        deposit={deposit}
        onOpenDeposit={onOpenDeposit}
      />
      <DepositBenefitsGrid />
      <OpenDepositRow
        onBack={onBack}
        depositName={deposit.name}
        depositId={deposit.id}
        depositCurrency={deposit.currency}
        interestRate={deposit.interestRate}
        term={deposit.term}
      />
    </StyledContainer>
  </>
);
