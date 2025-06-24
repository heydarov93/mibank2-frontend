import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton, SxProps, Typography } from '@mui/material';
import { useState } from 'react';

interface CardDetailRowProps {
  name: string;
  value: string | number;
  maskFormat?: string;
  onCopy?: (value: string | number) => void;
  nameSx?: SxProps;
  valueSx?: SxProps;
}

export function CardDetailRow({
  name,
  value,
  maskFormat,
  onCopy,
  nameSx,
  valueSx,
}: CardDetailRowProps) {
  const [isDataVisible, setIsDataVisible] = useState(!maskFormat);

  function handleVisibilityToggle() {
    setIsDataVisible((v) => !v);
  }

  return (
    <Box
      display="flex"
      alignItems="flex-end"
      justifyContent="space-between"
      gap={2}
    >
      <Box fontWeight={400}>
        <Typography
          fontWeight="inherit"
          color="grey.400"
          textTransform="uppercase"
          sx={{ ...nameSx }}
        >
          {name}
        </Typography>
        <Typography
          fontWeight="inherit"
          color="common.black"
          sx={{ ...valueSx }}
        >
          {isDataVisible ? value : maskFormat}
        </Typography>
      </Box>
      {maskFormat && (
        <IconButton
          data-testid="visibility-toggle"
          disableRipple
          sx={{ color: 'grey.300', padding: 0 }}
          onClick={handleVisibilityToggle}
        >
          {isDataVisible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
        </IconButton>
      )}
      {onCopy && (
        <IconButton
          data-testid="copy-button"
          onClick={() => onCopy(value)}
          disableRipple
          sx={{ color: 'grey.300', padding: 0 }}
        >
          {<ContentCopyIcon />}
        </IconButton>
      )}
    </Box>
  );
}
