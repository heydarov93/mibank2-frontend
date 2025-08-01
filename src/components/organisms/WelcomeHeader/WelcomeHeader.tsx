import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DropDownBox,
  StyledContainer,
  StyledRightSection,
  StyledContactsText,
  StyledTab,
  StyledTabs,
  StyledLangText,
} from './WelcomeHeader.styled';

interface WelcomeHeaderProps {
  activeTab: number;
  onTabChange: (event: SyntheticEvent, value: number) => void;
}

export const WelcomeHeader = ({
  activeTab,
  onTabChange,
}: WelcomeHeaderProps) => {
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation('translation', {
    keyPrefix: 'header.topNavMenu',
  });

  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setLangAnchorEl(null);
  };

  return (
    <StyledContainer>
      <StyledTabs
        value={activeTab}
        onChange={onTabChange}
        data-testid="header-tab-list"
      >
        {[t('personal'), t('business'), t('aboutUs')].map((tab, index) => (
          <StyledTab
            key={tab}
            label={tab}
            id={`tab-${index}`}
            aria-controls={`tabpanel-${index}`}
          />
        ))}
      </StyledTabs>

      <StyledRightSection>
        <IconButton data-testid="search-button">
          <SearchIcon width="24px" height="24px" />
        </IconButton>

        <StyledContactsText variant="body2">{t('contacts')}</StyledContactsText>

        <DropDownBox onClick={handleLangClick}>
          <StyledLangText variant="body2">{t('language')}</StyledLangText>
          <ExpandMoreIcon fontSize="small" width="24px" height="24px" />
        </DropDownBox>
        <Menu
          anchorEl={langAnchorEl}
          open={Boolean(langAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>{t('language')}</MenuItem>
        </Menu>
      </StyledRightSection>
    </StyledContainer>
  );
};
