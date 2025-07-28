import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

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
  const { palette } = useTheme();

  return (
    <StyledWhiteBox>
      <StyledMessageTypography>
        {errorTitle} <br /> {errorSubTitle}
      </StyledMessageTypography>
      <StyledViewAllBox onClick={onViewAll}>
        <SearchIcon
          sx={{
            color: palette.primary.main,
            width: '24px',
            height: '24px',
          }}
        />
        <StyledViewAllTypography>{viewAllText}</StyledViewAllTypography>
      </StyledViewAllBox>
    </StyledWhiteBox>
  );
};
