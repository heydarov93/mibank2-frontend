import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Stack, StackProps, Typography, useTheme } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const IssueCardModalBottomAlert = memo<StackProps>(
  ({ sx, ...props }: StackProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'IssueCardModal',
    });
    const { palette, spacing } = useTheme();

    return (
      <Stack
        role="alert"
        aria-live="polite"
        sx={{
          color: palette.grey[400],
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing(1),
          ...sx,
        }}
        {...props}
      >
        <InfoOutlinedIcon fontSize="small" aria-hidden="true" />
        <Typography sx={{ fontSize: 14 }}>{t('bottomAlert')}</Typography>
      </Stack>
    );
  },
);

IssueCardModalBottomAlert.displayName = 'IssueCardModalBottomAlert';
