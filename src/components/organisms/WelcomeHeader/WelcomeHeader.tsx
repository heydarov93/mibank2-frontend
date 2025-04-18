import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DropDownBox,
  StyledTab,
  StyledTabs,
  RightSection,
  StyledContainer,
} from './WelcomeHeader.styled';

export const WelcomeHeader = ({
  activeTab,
  onSetActiveTab,
}: {
  activeTab: number;
  onSetActiveTab: (event: React.SyntheticEvent, value: number) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation('translation', {
    keyPrefix: 'header.topNavMenu',
  });

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setLangAnchorEl(null);
  };

  return (
    <StyledContainer>
      <StyledTabs value={activeTab} onChange={onSetActiveTab}>
        {[t('personal'), t('business'), t('aboutUs')].map((tab, index) => (
          <StyledTab
            key={tab}
            label={tab}
            id={`tab-${index}`}
            aria-controls={`tabpanel-${index}`}
          />
        ))}
      </StyledTabs>

      <RightSection>
        <IconButton>
          <SearchIcon sx={{ width: '24px', height: '24px' }} />
        </IconButton>

        <DropDownBox onClick={handleMenuClick}>
          <Typography variant="body2">{t('contacts')}</Typography>
          <ExpandMoreIcon
            fontSize="small"
            sx={{ width: '24px', height: '24px' }}
          />
        </DropDownBox>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Contact 1</MenuItem>
        </Menu>

        <DropDownBox onClick={handleLangClick}>
          <Typography variant="body2">{t('language')}</Typography>
          <ExpandMoreIcon
            fontSize="small"
            sx={{ width: '24px', height: '24px' }}
          />
        </DropDownBox>
        <Menu
          anchorEl={langAnchorEl}
          open={Boolean(langAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>ENG</MenuItem>
        </Menu>
      </RightSection>
    </StyledContainer>
  );
};
