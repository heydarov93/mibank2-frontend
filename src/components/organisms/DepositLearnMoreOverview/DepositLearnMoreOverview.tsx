import { Box } from '@mui/material';

import { DepositBox } from 'components/molecules';
import { IDeposit } from 'models/IDepositInfo';

interface MainContentProps {
  deposit: IDeposit;
  imageSrc: string;
  onOpenForm: () => void;
}
export const DepositLearnMoreOverview = ({
  deposit,
  imageSrc,
  onOpenForm,
}: MainContentProps) => (
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
