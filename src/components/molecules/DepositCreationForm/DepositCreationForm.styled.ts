import {
  Box,
  Button,
  FormControlLabel,
  InputLabel,
  styled,
  Typography,
} from '@mui/material';

export const StyledHeader = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: spacing(1),
}));

export const StyledTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    color: palette.common.black,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '100%',
    letterSpacing: 0,
  }),
);

export const StyledSubTitle = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    color: palette.grey[400],
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: 0,
    marginTop: spacing(1.5),
    marginBottom: spacing(4),
  }),
);

export const StyledLabel = styled(InputLabel)(
  ({ theme: { palette, typography, spacing } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '20px',
    letterSpacing: '0.1px',
    color: palette.common.black,
    marginBottom: spacing(0.5),
  }),
);

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    maxWidth: '500px',
    padding: spacing(5),
    borderRadius: '8px',
    backgroundColor: palette.common.white,
    boxShadow: `0 4px 12px ${palette.shadow.shadowLight}`,
  }),
);

export const StyledInterestBox = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.bg.lightBlue,
    color: palette.common.black,
    border: `1px solid ${palette.grey[200]}`,
    padding: spacing(3.25, 1.75),
    borderRadius: '8px',
    width: '100%',
    minHeight: '80px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,
    overflow: 'hidden',
  }),
);

export const StyledInterestText = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    color: palette.common.black,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '100%',
    letterSpacing: 0,
    width: '200px',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    marginRight: spacing(1.5),
  }),
);

export const StyledInterestLabel = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '100%',
    letterSpacing: 0,
    color: palette.grey[300],
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    hyphens: 'auto',
    overflow: 'hidden',
  }),
);

export const StyledTermsRow = styled(FormControlLabel)(
  ({ theme: { spacing } }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: spacing(2),
    margin: spacing(2.5, 0, 1, 0),
  }),
);

export const StyledTermsText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '100%',
    color: palette.common.black,
    letterSpacing: 0,
  }),
);

export const StyledTermsLink = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '100%',
    letterSpacing: 0,
    color: palette.primary.dark,
    textDecoration: 'underline',
    cursor: 'pointer',
    verticalAlign: 'middle',
  }),
);

export const StyledBtnRow = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: ' flex-end',
  marginTop: spacing(4),
}));

export const StyledActionBtn = styled(Button)(
  ({ theme: { typography, spacing } }) => ({
    height: '55px',
    borderRadius: '8px',
    padding: spacing(2.5, 3),
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: 0,
  }),
);

export const StyledOption = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

export const StyledOptionText = styled(Box)(({ theme: { typography } }) => ({
  fontFamily: typography.mediumLogo?.fontFamily,
  fontWeight: 400,
  fontSize: typography.mediumLogo?.fontSize,
  lineHeight: '20px',
  letterSpacing: '0.25px',
}));
