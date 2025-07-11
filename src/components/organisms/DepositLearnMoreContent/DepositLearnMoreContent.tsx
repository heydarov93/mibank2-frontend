import { DepositBenefitsGrid } from '../DepositBenefitsGrid/DepositBenefitsGrid';
import { DepositLearnMoreDetails } from '../DepositLearnMoreDetails/DepositLearnMoreDetails';
import { DepositLearnMoreOverview } from '../DepositLearnMoreOverview/DepositLearnMoreOverview';
import { OpenDepositRow } from '../OpenDepositRow/OpenDepositRow';

import { StyledContainer } from './DepositLearnMoreContent.styled';

import { IDeposit } from 'models/IDepositInfo';

interface DepositLearnMoreContentProps {
  deposit: IDeposit;
  imageSrc: string;
  viewAllButton: JSX.Element;
  onOpenForm: () => void;
  onBack: () => void;
  onOpenDeposit: (deposit: IDeposit) => void;
}

export const DepositLearnMoreContent = ({
  deposit,
  imageSrc,
  viewAllButton,
  onOpenForm,
  onBack,
  onOpenDeposit,
}: DepositLearnMoreContentProps) => (
  <StyledContainer>
    <DepositLearnMoreOverview
      deposit={deposit}
      imageSrc={imageSrc}
      onOpenForm={onOpenForm}
      viewAllButton={viewAllButton}
    />
    <DepositLearnMoreDetails deposit={deposit} onOpenDeposit={onOpenDeposit} />
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
);
