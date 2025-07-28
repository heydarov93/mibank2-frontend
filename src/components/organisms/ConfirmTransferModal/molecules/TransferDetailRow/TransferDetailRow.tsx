import { useTheme } from '@mui/material';
import { ReactNode } from 'react';

import {
  StyledLabelBoldText,
  StyledLabelRow,
  StyledLabelRowText,
} from './TransferDetailRow.styled';

interface TransferDetailRowProps {
  label: string;
  value: string | ReactNode;
  isTotalRow?: boolean;
}

export const TransferDetailRow = ({
  label,
  value,
  isTotalRow = false,
}: TransferDetailRowProps) => {
  const { palette } = useTheme();
  return (
    <StyledLabelRow>
      {isTotalRow ? (
        <>
          <StyledLabelBoldText>{label}</StyledLabelBoldText>
          <StyledLabelBoldText
            sx={{ fontWeight: 600, fontSize: '24px', textAlign: 'right' }}
          >
            {value}
          </StyledLabelBoldText>
        </>
      ) : (
        <>
          <StyledLabelRowText sx={{ color: palette.grey[400] }}>
            {label}
          </StyledLabelRowText>
          <StyledLabelRowText
            sx={{ color: palette.common.black, textAlign: 'right' }}
          >
            {value}
          </StyledLabelRowText>
        </>
      )}
    </StyledLabelRow>
  );
};
