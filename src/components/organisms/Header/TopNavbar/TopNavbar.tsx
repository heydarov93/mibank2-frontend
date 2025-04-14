import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DropDownBox,
  LeftTab,
  LeftTabs,
  RightSection,
  TopNavbarContainer,
} from './TopNavbar.styled';

export const TopNavbar = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation('translation', {
    keyPrefix: 'header.topNavMenu',
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    <TopNavbarContainer>
      <LeftTabs value={value} onChange={handleTabChange}>
        <LeftTab label={t('personal')} />
        <LeftTab label={t('business')} />
        <LeftTab label={t('aboutUs')} />
      </LeftTabs>

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
    </TopNavbarContainer>
  );
};
