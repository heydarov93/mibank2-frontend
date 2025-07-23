import { Drawer, useTheme } from '@mui/material';

import { DepositLearnMore } from 'components/organisms/DepositLearnMore/DepositLearnMore';
import { IDeposit } from 'models/IDepositInfo';

interface LearnDepositModalProps {
  open: boolean;
  data: IDeposit | null;
  onClose: () => void;
  onBack: () => void;
}

export function LearnDepositModal({
  open,
  data,
  onClose,
  onBack,
}: LearnDepositModalProps) {
  const { spacing } = useTheme();
  if (!data) return null;
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: `calc(100vh - ${spacing(7.5)})`,
          top: spacing(7.5),
          borderTopLeftRadius: spacing(1),
          borderBottomLeftRadius: spacing(1),
        },
      }}
    >
      <DepositLearnMore depositData={data} onBack={onBack} />
    </Drawer>
  );
}
