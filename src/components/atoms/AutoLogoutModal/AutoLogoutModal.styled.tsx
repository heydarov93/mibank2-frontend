import { Dialog, styled } from '@mui/material';

export const StyledAutoLogoutModal = styled(Dialog)(
  ({ theme, theme: { palette } }) => ({
    '& .MuiDialog-paper': {
      width: '100%',
      height: '100%',
      maxHeight: '300px',
      maxWidth: '520px',
      borderRadius: '10px',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        maxHeight: '270px',
      },
    },

    '& .MuiDialogTitle-root': {
      fontSize: '32px',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '40px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
        marginTop: '20px',
      },
    },
    '& .MuiDialogContentText-root': {
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'center',
      width: '400px',
      color: 'initial',
      [theme.breakpoints.down('sm')]: {
        width: '230px',
        fontSize: '14px',
      },
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1, 2),
      justifyContent: 'space-between',
    },
    '& .MuiButton-root': {
      fontSize: '16px',
      width: '196px',
      height: '56px',
      margin: '0px 8px 35px 8px',
      border: `2px solid ${palette.primary.main}`,
      borderRadius: '8px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        width: '120px',
        height: '48px',
        margin: '0px 4px 35px 4px',
      },
    },
    '& .confirmButton': {
      color: palette.common.white,
      background: palette.primary.main,
      '&:hover': {
        background: palette.primary.dark,
        border: `2px solid ${palette.primary.dark}`,
      },
    },
    '& .cancelButton': {
      color: palette.primary.main,
      background: palette.common.white,
      '&:hover': {
        color: palette.primary.dark,
        border: `2px solid ${palette.primary.dark}`,
      },
    },

    '& .MuiIconButton-root': {
      position: 'absolute',
      right: 8,
      top: 8,
      color: palette.grey[500],
    },
  }),
);
