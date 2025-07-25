import { Dialog, styled } from '@mui/material';

export const StyledAutoLogoutModal = styled(Dialog)(
  ({ theme, theme: { palette } }) => ({
    '& .MuiDialog-paper': {
      width: '100%',
      height: '100%',
      maxHeight: '350px',
      maxWidth: '520px',
      borderRadius: '10px',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        maxHeight: 'max-content',
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
    '& .MuiDialogContent-root': {
      overflowY: 'hidden',
      paddingInline: '50px',
      [theme.breakpoints.down('sm')]: {
        paddingInline: '10px',
        minHeight: 'max-content',
        paddingBlock: '0px',
      },
    },
    '& .MuiDialogContentText-root': {
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      color: 'initial',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1, 2),
      justifyContent: 'space-between',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    '& .MuiButton-root': {
      fontSize: '16px',
      width: '196px',
      height: '56px',
      margin: '15px 8px 15px 8px',
      border: `2px solid ${palette.primary.main}`,
      borderRadius: '8px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        width: '120px',
        height: '48px',
        margin: '0px 4px 15px 4px',
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

    '& .timer': {
      color: palette.primary.main,
      backgroundColor: palette.primary.light,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      width: '100px',
      height: '45px',
      border: `2px solid ${palette.primary.light}`,
      borderRadius: '8px',
    },

    '& .MuiIconButton-root': {
      position: 'absolute',
      right: 8,
      top: 8,
      color: palette.grey[500],
    },
  }),
);
