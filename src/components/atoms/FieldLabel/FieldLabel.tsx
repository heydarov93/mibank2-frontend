import { InputLabel } from '@mui/material';
import { memo, ReactNode } from 'react';

interface FieldLabelProps {
  htmlFor: string;
  children: ReactNode;
  disabled?: boolean;
}

export const FieldLabel = memo<FieldLabelProps>(
  ({ htmlFor, children, disabled }: FieldLabelProps) => {
    return (
      <InputLabel
        htmlFor={htmlFor}
        disabled={disabled}
        aria-disabled={disabled}
        sx={{
          color: disabled ? 'grey[300]' : 'common.black',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 500,
        }}
      >
        {children}
      </InputLabel>
    );
  },
);

FieldLabel.displayName = 'FieldLabel';
