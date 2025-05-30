import { Stack, SxProps, Theme, Typography } from '@mui/material';

interface FieldWithLabelProps {
  label: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const FieldWithLabel = ({
  label,
  sx,
  children,
}: FieldWithLabelProps) => {
  return (
    <Stack gap={0.5} sx={{ '.MuiInputBase-input': { fontSize: 14 }, ...sx }}>
      <Typography sx={{ fontWeight: 500, fontSize: 14 }}>{label}</Typography>
      {children}
    </Stack>
  );
};
