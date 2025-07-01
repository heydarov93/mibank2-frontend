import { InputLabel } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  htmlFor: string;
  children: ReactNode;
  disabled?: boolean;
}

export function FieldLabel({ htmlFor, children, disabled }: Props) {
  return (
    <InputLabel
      htmlFor={htmlFor}
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
}
