import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, BoxProps, Stack, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface InfoPanelProps extends BoxProps {
  title: string;
  children: ReactNode;
}

export const InfoPanel = ({
  title,
  children,
  sx,
  ...boxProps
}: InfoPanelProps) => {
  const theme = useTheme();

  return (
    <Box
      {...boxProps}
      sx={{
        borderRadius: '8px',
        border: `1px solid ${theme.palette.grey[200]}`,
        overflow: 'hidden',
        flexShrink: 0,
        ...sx,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap="12px"
        sx={{
          background: theme.palette.primary.light,
          padding: '12px 24px',
        }}
      >
        <InfoOutlinedIcon sx={{ color: theme.palette.primary.main }} />
        <Typography fontWeight={500}>{title}</Typography>
      </Stack>
      <Box sx={{ padding: '24px' }}>{children}</Box>
    </Box>
  );
};
