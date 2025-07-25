import { Drawer, useTheme } from '@mui/material';

import { DepositDetails } from '../DepositDetails/DepositDetails';

import { IDeposit } from 'models/IDepositInfo';

interface DepositDetailsDrawerProps {
  open: boolean;
  data: IDeposit | null;
  onClose: () => void;
  onBack: () => void;
}

export function DepositDetailsDrawer({
  open,
  data,
  onClose,
  onBack,
}: DepositDetailsDrawerProps) {
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
      <DepositDetails depositData={data} onBack={onBack} />
    </Drawer>
  );
}
