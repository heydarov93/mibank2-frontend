import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Stack, Typography } from '@mui/material';

import { ReactComponent as CloseButton } from 'assets/icons/CloseIcon.svg';

interface ModalHeaderProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}

export const ModalHeader = ({ title, onBack, onClose }: ModalHeaderProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      mr="8px"
      data-testid="modal-header"
    >
      {onBack && (
        <ArrowBackIosIcon
          data-testid="modal-header-back-button"
          onClick={onBack}
          sx={(theme) => ({
            color: theme.palette.grey[400],
            cursor: 'pointer',
            mr: '4px',
          })}
        />
      )}
      <Typography fontWeight={500} fontSize={32}>
        {title}
      </Typography>
      {onClose && (
        <Box sx={{ ml: 'auto', cursor: 'pointer' }}>
          <CloseButton onClick={onClose} />
        </Box>
      )}
    </Stack>
  );
};
