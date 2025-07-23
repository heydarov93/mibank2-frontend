import { Box } from '@mui/material';

import { AboutDepositCard } from '../AboutDepositCard/AboutDepositCard';

import { InvestmentBox } from 'components/molecules';
import { IDeposit } from 'models/IDepositInfo';

interface DepositLearnMoreDetailsProps {
  deposit: IDeposit;
  onOpenDeposit: (deposit: IDeposit) => void;
}

export const DepositLearnMoreDetails = ({
  deposit,
}: DepositLearnMoreDetailsProps) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <AboutDepositCard
        capitalizationRate={deposit.capitalization}
        depositName={deposit.name}
        interestRate={deposit.interestRate}
        months={deposit.term}
        wdFee={deposit.earlyWithdrawalFee}
        wdLimit={deposit.earlyWithdrawalLimit}
        minDeposit={deposit.min}
      />
      <InvestmentBox interestRate={deposit.interestRate} />
    </Box>
  );
};
