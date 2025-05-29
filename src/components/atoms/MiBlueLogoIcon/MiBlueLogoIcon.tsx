import { Box, SxProps, Theme } from '@mui/material';

import { ReactComponent as MiBlueLogo } from 'assets/icons/MiBlueLogo.svg';

interface BlueLogoIconProps {
  sx?: SxProps<Theme>;
}

export const MiBlueLogoIcon = ({ sx, ...props }: BlueLogoIconProps) => {
  return (
    <Box
      sx={{
        backgroundColor: ({ palette }) => palette.common.white,
        marginBottom: ({ spacing }) => spacing(2),
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        ...sx,
      }}
      {...props}
    >
      <MiBlueLogo style={{ width: '48px', height: '48px' }} />
    </Box>
  );
};
