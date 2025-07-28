import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    width: '100%',
    height: 'fit-content',
    backgroundColor: palette.common.white,
    padding: spacing(4),
    borderRadius: '12px',
    boxShadow: `0 4px 24px 0 ${palette.shadow.shadowLight}`,
    border: `1px solid ${palette.border.lightBlue}`,
  }),
);

export const StyledCardContainer = styled(Box)(() => ({
  transition: 'all 0.3s ease',
  cursor: 'pointer',
}));

export const StyledTitleContainer = styled(Stack)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: spacing(2),
  marginBottom: spacing(1.5),
}));

export const StyledCardsContainer = styled(Stack)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: spacing(3),
}));

export const StyledTitle = styled(Typography)(({ theme: { palette } }) => ({
  fontFamily: 'Urbanist',
  fontSize: '26px',
  fontWeight: 600,
  lineHeight: '125%',
  width: 'max-content',
  color: palette.common.black,
}));

export const StyledSubTitle = styled(Typography)(({ theme: { palette } }) => ({
  fontFamily: 'Urbanist',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  width: 'max-content',
  color: palette.grey[400],
}));

export const StyledIconButton = styled(IconButton)(
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
