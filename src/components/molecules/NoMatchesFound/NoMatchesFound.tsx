import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledMessageTypography,
  StyledViewAllBox,
  StyledViewAllTypography,
  StyledWhiteBox,
} from './NoMatchesFound.styled';

interface NoMatchesFoundProps {
  onViewAll: () => void;
}

const NoMatchesFound = ({ onViewAll }: NoMatchesFoundProps) => {
  const theme = useTheme();
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice.employeeList' });

  return (
    <StyledWhiteBox>
      <StyledMessageTypography>
        {t('noMatchesFound.notFound')} <br /> {t('noMatchesFound.tryAgain')}
      </StyledMessageTypography>
      <StyledViewAllBox onClick={onViewAll}>
        <SearchIcon
          sx={{
            color: theme.palette.primary.main,
            width: '24px',
            height: '24px',
          }}
        />
        <StyledViewAllTypography>{t('noMatchesFound.viewAll')}</StyledViewAllTypography>
      </StyledViewAllBox>
    </StyledWhiteBox>
  );
};

export default NoMatchesFound;
