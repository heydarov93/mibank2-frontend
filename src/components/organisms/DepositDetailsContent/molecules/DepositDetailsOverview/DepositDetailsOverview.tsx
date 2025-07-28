import Box from '@mui/material/Box';

import { DepositBox } from 'components/molecules';
import { IDeposit } from 'models/IDepositInfo';

interface DepositDetailsOverviewProps {
  deposit: IDeposit;
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
