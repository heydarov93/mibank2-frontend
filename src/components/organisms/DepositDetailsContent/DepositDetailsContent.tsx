import { StyledContainer } from './DepositDetailsContent.styled';
import {
  DepositBenefitsGrid,
  DepositDetailsAbout,
  DepositDetailsHeader,
  DepositDetailsOverview,
  OpenDepositRow,
} from './molecules';

import { IDeposit } from 'models/IDepositInfo';

interface DepositDetailsContentProps {
  deposit: IDeposit;
  imageSrc: string;
  onOpenForm: () => void;
  onBack: () => void;
}

export const DepositDetailsContent = ({
  deposit,
  imageSrc,
  onOpenForm,
  onBack,
}: DepositDetailsContentProps) => (
  <>
    <DepositDetailsHeader onBack={onBack} label={deposit.name} />
    <StyledContainer>
      <DepositDetailsOverview
        deposit={deposit}
        imageSrc={imageSrc}
        onOpenForm={onOpenForm}
      />
      <DepositDetailsAbout deposit={deposit} />
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
