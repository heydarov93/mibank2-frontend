import { Dialog, styled } from '@mui/material';

export const StyledAutoLogoutMessageModal = styled(Dialog)(
  ({ theme, theme: { palette } }) => ({
    '& .MuiDialog-paper': {
      width: '100%',
      maxHeight: '250px',
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

    '& .MuiDialogContent-root': {
      overflowY: 'hidden',
      paddingInline: '50px',
      [theme.breakpoints.down('sm')]: {
        paddingInline: '10px',
        minHeight: 'min-content',
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
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
    },
    '& .MuiButton-root': {
      fontSize: '16px',
      width: '412px',
      height: '56px',
      margin: '0px 8px 35px 8px',
      color: palette.primary.main,
      border: `2px solid ${palette.primary.main}`,
      borderRadius: '8px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        width: '120px',
        height: '48px',
        margin: '0px 4px 15px 4px',
      },
    },
    '& .login': {
      color: palette.common.white,
      background: palette.primary.main,
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
