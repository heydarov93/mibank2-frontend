import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

export const StyledPhoneNumberField = styled(PhoneInput, {
  shouldForwardProp: (prop) => prop !== 'hasError',
})<{ hasError: boolean }>(({ theme: { palette }, hasError }) => ({
  '& .form-control': {
    width: '100%',
    height: '56px',
    margin: '1px',
    padding: '16px',
    paddingLeft: '70px',
    fontSize: '1rem',
    border: '2px solid transparent',
    outline: `1px solid ${hasError ? palette.error.main : palette.grey[300]}`,
    borderRadius: 8,
    transition: 'none',
    '&:hover': {
      border: `2px solid ${palette.grey[400]}`,
      outline: '0px',
    },
    '&:focus': {
      boxShadow: 'none',
      border: `2px solid ${hasError ? palette.error.main : palette.primary.main}`,
      outline: '0px',
    },
  },

  '& .flag-dropdown': {
    border: 'none',
    borderRadius: 8,
    marginLeft: '6px',
  },

  '& .special-label': {
    display: 'none',
  },

  '& .selected-flag': {
    '& .arrow': {
      borderLeftWidth: '6px',
      borderRightWidth: '6px',
      borderTop: '6px solid',
    },
    '& .arrow.up': {
      borderLeftWidth: '6px',
      borderRightWidth: '6px',
      borderBottom: '6px solid',
    },

    '&:focus .arrow': {
      borderLeftWidth: '6px',
      borderRightWidth: '6px',
    },
  },
}));

export const StyledErrorText = styled(FormHelperText)(
  ({ theme: { palette } }) => ({
    '& .errorText': {
      marginLeft: '14px',
      color: palette.error.main,
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

export const ShakeWrapper = styled('div')(({ theme: { animations } }) => ({
  '&.shake': {
    animation: `${animations?.shake} 0.25s`,
  },
}));
