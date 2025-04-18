import { Box } from '@mui/material';
import { useState } from 'react';

import {
  StyledContainer
} from './DepositLearnMorePage.styled';

import { DepositBox, InvestmentBox } from 'components/molecules';
import { AboutDepositCard, DepositBenefitsGrid } from 'components/organisms';
import { OpenDepositForm } from 'components/organisms/OpenDepositForm/OpenDepositForm';

export const DepositLearnMorePage = () => {
  const [openDeposit, setOpenDeposit] = useState<boolean>(false);
  //TODO: Wait until backend is ready to replace the mock data
  const mockData = {
    name: 'The Best Deposit',
    id: 1,
    type: 'Term Deposit',
    currency: 'USD',
    min: 1,
    max: 2,
    description: 'Valid Description Valid',
    term: 12,
    minDeposit: 100,
    interestRate: 3,
    capitalization: 3,
    earlyWithdrawalLimit: 2,
    earlyWithdrawalFee: 3,
    earlyWithdrawal: true,
    augmentable: true,
    autoRenewable: true,
  };

  return (
    <StyledContainer>
      <Box>
        <DepositBox
          depositCurrency={mockData.currency}
          depositDescription={mockData.description}
          depositDuration={mockData.term}
          depositName={mockData.name}
          depositRate={mockData.interestRate}
          openDeposit={openDeposit}
          setOpenDeposit={setOpenDeposit}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <AboutDepositCard
          capitalizationRate={mockData.capitalization}
          depositName={mockData.name}
          interestRate={mockData.interestRate}
          months={mockData.term}
          wdFee={mockData.earlyWithdrawalFee}
          wdLimit={mockData.earlyWithdrawalLimit}
          minDeposit={mockData.minDeposit}
        />
        <InvestmentBox
          interestRate={mockData.interestRate}
          setOpenDeposit={setOpenDeposit}
        />
      </Box>
      <DepositBenefitsGrid />
      <OpenDepositForm />
    </StyledContainer>
  );
};
