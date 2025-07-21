import { Stack, SxProps, Theme, Typography } from '@mui/material';
import { memo, ReactNode, useId } from 'react';

interface FieldWithLabelProps {
  label: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const FieldWithLabel = memo<FieldWithLabelProps>(
  ({ label, sx, children }: FieldWithLabelProps) => {
    const id = useId();
    const labelId = `${id}-field-label`;

    return (
      <Stack
        sx={{ '.MuiInputBase-input': { fontSize: 14 }, gap: 0.5, ...sx }}
        role="group"
        aria-labelledby={labelId}
      >
        <Typography
          id={labelId}
          component="span"
          variant="subtitle2"
          sx={{ fontWeight: 500, fontSize: 14 }}
        >
          {label}
        </Typography>
        {children}
      </Stack>
    );
  },
);

FieldWithLabel.displayName = 'FieldWithLabel';
