import Backdrop from "@mui/material/Backdrop";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";


export const StyledModal = styled(Modal)(({ theme: { palette } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${palette.border.lightBlue}`,
}));

export const StyledModalContent = styled(Paper)(({ theme: { spacing } }) => ({
  width: '520px',
  position: 'relative',
  padding: spacing(5),
  borderRadius: spacing(1),
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
    color: palette.grey[400],
    width: '28px',
    height: '28px',
  }),
);

export const StyledFormControlLabel = styled(FormControlLabel)(
  ({ theme: { typography, palette, spacing } }) => ({
    marginTop: spacing(4),
    '& .MuiFormControlLabel-label': {
      fontFamily: typography.mediumLogo?.fontFamily,
      color: palette.grey[400],
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      letterSpacing: 0,
    },
  }),
);

export const StyledInputLabel = styled(Typography)(
  ({ theme: { typography, palette, spacing } }) => ({
    marginBottom: spacing(0.5),
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.black,
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px',
  }),
);

export const StyledInputField = styled(TextField)(
  ({ theme: { palette, spacing } }) => ({
    '& .MuiInputBase-input': {
      height: '30px',
      padding: spacing(1.5),
      borderRadius: '8px',
      border: `1px solid ${palette.border.lightBlue}`,
      backgroundColor: palette.primary.light,
    },
  }),
);

export const StyledBackdrop = styled(Backdrop)(() => ({}));
