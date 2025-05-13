import {
  Box,
  IconButton,
  Modal,
  Paper,
  styled,
  Typography,
} from '@mui/material';

export const StyledModal = styled(Modal)(({ theme: { palette } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${palette.border.lightBlue}`,
}));

export const StyledModalContent = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isCard',
})<{ isCard: boolean }>(({ theme, isCard }) => ({
  padding: '40px',
  width: isCard ? '365px' : '525px',
  borderRadius: theme.spacing(1),
  position: 'relative',
}));

export const StyledDetailsBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  margin: '32px 0px',
}));

export const StyledTitle = styled(Typography)(({ theme: { palette } }) => ({
  fontFamily: 'Roboto',
  fontWeight: 600,
  fontSize: '26px',
  letterSpacing: 0,
  color: palette.common.black,
}));

export const StyledCloseButton = styled(IconButton)(
  ({ theme: { palette } }) => ({
    position: 'absolute',
    top: '40px',
    right: '40px',
    color: palette.grey[400],
    width: '28px',
    height: '28px',
  }),
);

export const StyledActions = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '20px',
  marginTop: '32px',
});
