import { Step, StepLabel, Stepper, styled } from '@mui/material';

export const StyledStepper = styled(Stepper)(
  ({ theme: { breakpoints, palette, spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 275,

    [breakpoints.up('sm')]: {
      width: 375,
      marginBottom: spacing(2)
    },

    [breakpoints.up('md')]: {
      width: 420,
    },

    '& .MuiStepLabel-iconContainer': {
      display: 'none',
    },
    '& .MuiStepConnector-root': {
      display: 'flex',
      flexGrow: 1,
      height: '1px',
      backgroundColor: palette.grey[200],
      margin: '0 15px',
    },
  }),
);

export const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  dispaly: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '32px',
  height: '32px',
  border: `1px solid  ${theme.palette.grey[200]}`,
  borderRadius: '4px',
  transition: 'color 0.3s ease',
  '&.visible': {
    border: `1px solid  ${theme.palette.primary.main}`,
  },

  '& .MuiStepLabel-labelContainer': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .MuiStepLabel-label.Mui-active': {
    color: theme.palette.primary.main,
  },
  '& .MuiStepLabel-label.Mui-completed': {
    color: theme.palette.common.black,
    fontWeight: 400,
  },
  '& .MuiStepLabel-label.Mui-disabled': {
    color: theme.palette.common.black,
    fontWeight: 400,
  },
}));

export const StyledStep = styled(Step)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
}));
