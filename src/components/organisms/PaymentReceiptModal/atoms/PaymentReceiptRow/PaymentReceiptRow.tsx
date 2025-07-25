import { Stack, SxProps, Theme, Typography } from '@mui/material';

import { StyledName } from './PaymentReceiptRow.styled';

interface PaymentReceiptRowProps {
  name: string;
  value: string;
  nameSx?: SxProps<Theme>;
  valueSx?: SxProps<Theme>;
}

export const PaymentReceiptRow = ({
  name,
  value,
  nameSx,
  valueSx,
}: PaymentReceiptRowProps) => {
  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <StyledName sx={nameSx}>{name}</StyledName>
      <Typography sx={valueSx}>{value}</Typography>
    </Stack>
  );
};
