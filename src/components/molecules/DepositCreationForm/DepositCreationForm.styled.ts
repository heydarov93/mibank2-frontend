import {
  Box,
  Button,
  FormControlLabel,
  InputLabel,
  styled,
  Typography,
} from '@mui/material';

export const FormHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '8px',
}));

export const FormTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '100%',
    letterSpacing: 0,
    color: palette.common.black,
  }),
);

export const FormSubTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: 0,
    color: palette.grey[400],
    marginTop: '12px',
    marginBottom: '32px',
  }),
);

export const FormLabel = styled(InputLabel)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '20px',
    letterSpacing: '0.1px',
    color: palette.common.black,
    marginBottom: '4px',
  }),
);

export const FormContainer = styled(Box)(({ theme: { palette } }) => ({
  backgroundColor: palette.common.white,
  maxWidth: 500,
  padding: '40px',
  borderRadius: '8px',
  boxShadow: `0 4px 12px ${palette.shadow.shadowLight}`,
}));

export const FormInterestBox = styled(Box)(({ theme: { palette } }) => ({
  backgroundColor: palette.bg.lightBlue,
  border: `1px solid ${palette.grey[200]}`,
  padding: '26px 14px',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: palette.common.black,
  boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,
  height: '80px',
  width: '100%',
}));

export const FormInterestText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '100%',
    letterSpacing: 0,
    color: palette.common.black,
    width: '200px',
  }),
);

export const FormInterestLabel = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '100%',
    letterSpacing: 0,
    color: palette.grey[300],
  }),
);

export const FormTermsRow = styled(FormControlLabel)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: '20px 0px 8px 0px',
}));

export const FormTermsText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '100%',
    marginTop: '12px',
    color: palette.common.black,
    letterSpacing: 0,
    verticalAlign: 'middle',
  }),
);

export const FormTermsLink = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '100%',
    letterSpacing: 0,
    verticalAlign: 'middle',
    color: palette.primary.dark,
    textDecoration: 'underline',
    cursor: 'pointer',
  }),
);

export const FormOpenDepositBtnBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: ' flex-end',
  marginTop: '32px',
}));

export const FormActionBtn = styled(Button)(
  ({ theme: { typography } }) => ({
    width: '145px',
    height: '55px',
    borderRadius: '8px',
    padding: '19px 24px',
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: 0,
  }),
);
