import { Step, StepLabel, StepLabelProps, Stepper, styled } from "@mui/material";

interface CustomStepLabelProps extends StepLabelProps {
  visible: boolean;
}

export const StyledStepper = styled(Stepper)(
  ({ theme: { breakpoints, palette } }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    width: 275, 

    [breakpoints.up('sm')]: {
      width: 375, 
    },

    [breakpoints.up('md')]: {
      width: 675,
    },

    "& .MuiStepLabel-iconContainer": {
        display: "none",
    }, 
    '& .MuiStepConnector-root': {
      display: 'flex',
      flexGrow: 1,
      height: '1px',
      backgroundColor: palette.grey[200],
      margin: '0 15px',
  }
  }));

export const StyledStepLabel = styled(StepLabel)<CustomStepLabelProps>(({ theme, visible }) => ({
    dispaly: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '32px',
    height: '32px',
    border: `1px solid ${visible ? theme.palette.primary.main : theme.palette.grey[200]}`,
    borderRadius: '4px',
    transition: 'color 0.3s ease',

  '& .MuiStepLabel-labelContainer': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .MuiStepLabel-label': {
    color: visible ? theme.palette.primary.main : theme.palette.grey[200], 
    fontSize: '16px', 
  },
  '& .MuiStepLabel-label.Mui-active': {
    color: theme.palette.primary.main,
  },
  '& .MuiStepLabel-label.Mui-completed': {
    color: theme.palette.grey[200],
  },
}));

export const StyledStep = styled(Step)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
}));
