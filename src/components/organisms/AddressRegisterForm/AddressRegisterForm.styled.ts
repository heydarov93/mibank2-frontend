import {
  Box,
  Button,
  TextField,
  Select,
  Typography,
  styled,
  Paper,
} from '@mui/material';

export const StyledFormContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
}));

export const StyledRegisterForm = styled(Box)(({ theme: { spacing } }) => ({
  flex: 1,
  padding: spacing(5),
  maxWidth: '550px',
}));

export const StyledFormTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.black,
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '125%',
    textAlign: 'center',
  }),
);

export const StyledFormHeader = styled(Box)(({ theme: { spacing } }) => ({
  marginBottom: spacing(3.75),
}));

export const StyledFormContent = styled('form')(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(2.5),
}));

export const StyledFieldRow = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  gap: spacing(2),
  width: '100%',
}));

export const StyledButton = styled(Button)(
  ({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.primary.dark,
    textTransform: 'none',
    padding: spacing(1.5),
    marginTop: spacing(1.25),
    '&:hover': {
      backgroundColor: palette.primary.main,
    },
  }),
);

export const StyledTextField = styled(TextField)(({ theme: { palette } }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    height: '55px',
    '& fieldset': {
      border: `1px solid ${palette.grey[300]}`,
    },
  },
}));

export const StyledSelect = styled(Select)(({ theme: { palette } }) => ({
  borderRadius: '8px',
  height: '50px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${palette.grey[300]}`,
  },
}));

export const StyledFieldLabel = styled(Typography)(
  ({ theme: { typography, palette, spacing } }) => ({
    color: palette.common.black,
    fontSize: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '0.1px',
    marginBottom: spacing(1),
  }),
);

export const StyledCityAutocomplete = styled(TextField)(
  ({ theme: { palette } }) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      height: '55px',
      '& fieldset': {
        border: `1px solid ${palette.grey[300]}`,
      },
      '&:hover fieldset': {
        border: `1px solid ${palette.grey[400]}`,
      },
      '&.Mui-focused fieldset': {
        border: `2px solid ${palette.primary.main}`,
      },
    },
    '& .MuiInputBase-input': {
      padding: '14px 16px',
      fontSize: '16px',
      '&::placeholder': {
        color: palette.grey[500],
        opacity: 1,
      },
    },
  }),
);

export const StyledCityDropdown = styled(Paper)(
  ({ theme: { palette, spacing } }) => ({
    maxHeight: '200px',
    overflowY: 'auto',
    marginTop: spacing(0.5),
    borderRadius: '8px',
    boxShadow: `0px 4px 20px ${palette.shadow.shadowLight}`,
    border: `1px solid ${palette.grey[200]}`,

    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    '&::-webkit-scrollbar-thumb': {
      background: palette.common.white,
      '&:hover': {
        background: palette.common.white,
      },
    },

    '&::-webkit-scrollbar-thumb:active': {
      background: palette.grey[500],
    },

    scrollbarWidth: 'thin',
    scrollbarColor: `${palette.primary.main} transparent`,
  }),
);

export const StyledCityMenuItem = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    padding: spacing(1.5, 2),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: palette.common.white,
    },
  }),
);

export const StyledCityMenuText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    color: palette.common.black,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '20px',
    letterSpacing: '0.25px',
  }),
);

export const ErrorMessage = styled(Typography)(
  ({ theme: { palette, spacing } }) => ({
    color: palette.error.main,
    fontSize: '12px',
    marginTop: spacing(0.5),
  }),
);

export const StyledBackButtonText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    color: palette.common.black,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',
  }),
);

export const StyledBackButton = styled(Button)(({ theme: { spacing } }) => ({
  height: '25px',
  width: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: spacing(4, 2, 0, 4),
  padding: spacing(2),
  gap: spacing(0.5),
}));
