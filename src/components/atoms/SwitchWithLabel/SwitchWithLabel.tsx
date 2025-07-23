import {
  Stack,
  Typography,
  Switch,
  SwitchProps,
  Theme,
  SxProps,
} from '@mui/material';
import { memo } from 'react';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface SwitchWithLabelProps extends SwitchProps {
  label: string;
  control?: Control;
  sx?: SxProps<Theme>;
}

export const SwitchWithLabel = memo<SwitchWithLabelProps>(
  ({ label, sx, ...switchProps }: SwitchWithLabelProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={sx}>
        <Typography fontSize={14}>{label}</Typography>
        <Switch {...switchProps} aria-label={t('label.switch')} />
      </Stack>
    );
  },
);

SwitchWithLabel.displayName = 'SwitchLabel';
