import { Stack, Typography, Switch, SwitchProps } from '@mui/material';
import { Control } from 'react-hook-form';

interface SwitchWithLabelProps extends SwitchProps {
  label: string;
  control?: Control;
}

export const SwitchWithLabel = ({
  label,
  sx,
  ...switchProps
}: SwitchWithLabelProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" gap={2} sx={sx}>
      <Typography fontSize={14}>{label}</Typography>
      <Switch {...switchProps} />
    </Stack>
  );
};
