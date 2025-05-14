import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Stack, StackProps, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const IssueCardModalBottomAlert = ({ sx, ...props }: StackProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{ color: theme.palette.grey[400], ...sx }}
      {...props}
    >
      <InfoOutlinedIcon />
      <Typography sx={{ fontSize: 14 }}>{t('bottomAlert')}</Typography>
    </Stack>
  );
};
