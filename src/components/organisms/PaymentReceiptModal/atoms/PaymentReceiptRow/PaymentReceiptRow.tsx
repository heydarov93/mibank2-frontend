import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';

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
