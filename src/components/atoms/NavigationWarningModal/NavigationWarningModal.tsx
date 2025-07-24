import CloseIcon from '@mui/icons-material/Close';
import { IconButton, SxProps, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledDialog } from './NavigationWarningModal.styled';

interface NavigationWarningModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  testId?: string;
  sx?: SxProps<Theme>;
  onConfirm: () => void;
  onCancel: () => void;
}

export const NavigationWarningModal = memo<NavigationWarningModalProps>(
  ({
    open,
    title,
    description,
    confirmLabel,
    cancelLabel,
    testId,
    sx,
    onConfirm,
    onCancel,
  }: NavigationWarningModalProps) => {
    const { t } = useTranslation('translation', { keyPrefix: 'common' });
    const translatedTexts = {
      title: title || t('warning.title'),
      description: description || t('warning.contentText'),
      cancel: cancelLabel || t('warning.cancel'),
      confirm: confirmLabel || t('warning.confirm'),
    };

    return (
      <StyledDialog
        aria-hidden={open}
        open={open}
        onClose={onCancel}
        data-testid={testId}
        sx={sx}
      >
        <DialogTitle>
          {translatedTexts.title}
          <IconButton
            onClick={onCancel}
            aria-label={t('Accessibility.label.close')}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{translatedTexts.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onCancel}
            className="cancelButton"
            aria-label={t('Accessibility.label.cancel')}
          >
            {translatedTexts.cancel}
          </Button>
          <Button
            onClick={onConfirm}
            className="confirmButton"
            aria-label={t('Accessibility.label.submit')}
          >
            {translatedTexts.confirm}
          </Button>
        </DialogActions>
      </StyledDialog>
    );
  },
);

NavigationWarningModal.displayName = 'NavigationWarningModal';
