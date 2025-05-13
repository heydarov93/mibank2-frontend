import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material';

import {
  StyledMessageTypography,
  StyledViewAllBox,
  StyledViewAllTypography,
  StyledWhiteBox,
} from './NoMatchesFound.styled';

interface NoMatchesFoundProps {
  onViewAll: () => void;
  viewAllText: string;
  errorTitle: string;
  errorSubTitle: string;
}

export const NoMatchesFound = ({
  onViewAll,
  viewAllText,
  errorSubTitle,
  errorTitle,
}: NoMatchesFoundProps) => {
  const theme = useTheme();

  return (
    <StyledWhiteBox>
      <StyledMessageTypography>
        {errorTitle} <br /> {errorSubTitle}
      </StyledMessageTypography>
      <StyledViewAllBox onClick={onViewAll}>
        <SearchIcon
          sx={{
            color: theme.palette.primary.main,
            width: '24px',
            height: '24px',
          }}
        />
        <StyledViewAllTypography>{viewAllText}</StyledViewAllTypography>
      </StyledViewAllBox>
    </StyledWhiteBox>
  );
};
