import Box from '@mui/material/Box';

import { DepositBox } from 'components/molecules';
import { IDisplayDeposit } from 'models/IDeposit';

interface DepositDetailsOverviewProps {
  deposit: IDisplayDeposit;
  imageSrc: string;
  onOpenForm: () => void;
}
export const DepositDetailsOverview = ({
  deposit,
  imageSrc,
  onOpenForm,
}: DepositDetailsOverviewProps) => (
  <Box>
    <DepositBox
      depositCurrency={deposit.currency}
      depositDescription={deposit.description}
      depositDuration={deposit.term}
      depositName={deposit.name}
      depositRate={deposit.interestRate}
      depositImgSrc={imageSrc}
      onOpenDepositForm={onOpenForm}
    />
  </Box>
);
