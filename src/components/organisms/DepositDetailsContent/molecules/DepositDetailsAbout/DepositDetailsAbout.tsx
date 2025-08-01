import Box from '@mui/material/Box';

import { InvestmentBox, AboutDepositCard } from '../../atoms';

import { IDisplayDeposit } from 'models/IDeposit';

interface DepositDetailsAboutProps {
  deposit: IDisplayDeposit;
}

export const DepositDetailsAbout = ({ deposit }: DepositDetailsAboutProps) => {
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
