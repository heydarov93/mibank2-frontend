import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as CloseSVG } from 'assets/icons/CloseIcon.svg';

interface ModalHeaderProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}

export const ModalHeader = memo<ModalHeaderProps>(
  ({ title, onBack, onClose }: ModalHeaderProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <Stack
        direction="row"
        alignItems="center"
        mr={1}
        data-testid="modal-header"
      >
        {onBack && (
          <ArrowBackIosIcon
            data-testid="modal-header-back-button"
            sx={({ palette, spacing }) => ({
              color: palette.grey[400],
              cursor: 'pointer',
              marginRight: spacing(0.5),
            })}
            onClick={onBack}
            role="button"
            aria-label={t('label.goBack')}
          />
        )}
        <Typography fontWeight={500} fontSize={32}>
          {title}
        </Typography>
        {onClose && (
          <Box sx={{ marginLeft: 'auto', cursor: 'pointer' }}>
            <CloseSVG
              onClick={onClose}
              role="button"
              aria-label={t('label.close')}
            />
          </Box>
        )}
      </Stack>
    );
  },
);

ModalHeader.displayName = 'ModalHeader';
