import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  IconButton,
  Tab,
  Typography,
  TypographyProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Box)(() => ({ width: '100%' }));

export const StyledTitle = styled(Typography)(({ theme: { spacing } }) => ({
  fontFamily: 'Urbanist',
  fontSize: spacing(3.25),
  fontWeight: 600,
  width: 'max-content',
}));

export const StyledPlusIconButton = styled(IconButton)(
  ({ theme: { spacing, palette } }) => ({
    width: '24px',
    height: '24px',
    padding: spacing(1),
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  }),
);

export const StyledAccordion = styled(Accordion)(
  ({ theme: { palette, spacing } }) => ({
    width: '100%',
    border: `1px solid ${palette.border.lightBlue}`,
    boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,

    '&.MuiAccordion-root': {
      borderRadius: spacing(1),
    },

    '&::before': {
      display: 'none',
    },
  }),
);

export const StyledAccordionSummary = styled(AccordionSummary)(
  ({ theme: { spacing } }) => ({
    padding: spacing(3, 4),
    gap: spacing(4),
    '& .MuiAccordionSummary-content': {
      justifyContent: 'space-between',
      gap: spacing(4),
    },
  }),
);

export const StyledDepositName = styled(Typography)(
  ({ theme: { palette } }) => ({
    color: palette.custom.primary.darkGray,
    fontFamily: 'Urbanist',
    fontSize: '18px',
    lineHeight: '28px',
    fontWeight: 600,
    width: 'max-content',
  }),
);

export const StyledSummaryContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexGrow: 1,
}));

export const StyledSummaryTitleWrapper = styled(Typography)(
  ({ theme: { palette, spacing } }) => ({
    display: 'flex',
    gap: spacing(3.25),
    alignItems: 'center',

    '& .MuiSvgIcon-root': {
      color: palette.primary.dark,
      width: spacing(5),
      height: spacing(5),
    },
  }),
);

export const StyledSummaryInfoItem = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(0.5),
  flexGrow: 1,
}));

export const StyledSummaryInfoValue = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: spacing(2),
    lineHeight: '100%',
    letterSpacing: 0,
    color: palette.custom.primary.darkGray,
  }),
);

export const StyledSummaryInfoLabel = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    fontFamily: 'Roboto',
    fontSize: spacing(1.75),
    lineHeight: spacing(2.5),
    letterSpacing: 0,
    color: palette.custom.gray[400],
  }),
);

export const StyledStatusChipWrapper = styled(Box)(
  ({ theme: { spacing } }) => ({ paddingInline: spacing(3) }),
);

export const StyledStatusChip = styled(Chip)(
  ({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.custom.success.chipBg,
    padding: spacing(0.75, 3),
    '& .MuiChip-label': {
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: spacing(1.5),
      lineHeight: spacing(2),
      letterSpacing: 0,
      color: palette.custom.success.chipText,
      padding: 0,
    },
  }),
);

export const StyledAccordionDetails = styled(AccordionDetails)(
  ({ theme: { spacing } }) => ({
    padding: spacing(3),
  }),
);

export const StyledDepositTab = styled(Tab)(
  ({ theme: { spacing, palette } }) => ({
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: spacing(2),
    lineHeight: '100%',
    letterSpacing: 0,
    flexGrow: 1,
    maxWidth: 'none',
    color: palette.grey[400],
  }),
);

export const StyledInformationTabContent = styled(Box)(
  ({ theme: { spacing } }) => ({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    padding: spacing(4, 0, 2, 0),
    rowGap: spacing(3),
    columnGap: spacing(7),
  }),
);

export const StyledInfoFieldLabel = styled(Typography)<TypographyProps>(
  ({ theme: { palette, spacing } }) => ({
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: spacing(2),
    lineHeight: '100%',
    letterSpacing: 0,
    color: palette.grey[400],
    paddingInline: spacing(0.5),
  }),
);

export const StyledInfoFieldValue = styled(Typography)<TypographyProps>(
  ({ theme: { palette, spacing } }) => ({
    fontFamily: 'Inter',
    fontSize: spacing(2),
    lineHeight: spacing(3),
    letterSpacing: 0,
    color: palette.custom.basic.black,
  }),
);

export const StyledCopyIconButton = styled(IconButton)(
  ({ theme: { palette, spacing } }) => ({
    padding: 0,
    '& .MuiSvgIcon-root': {
      color: palette.grey[400],
      transform: 'scaleX(-1)',
      width: spacing(3),
      height: spacing(3),
    },
  }),
);
