import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
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

export const WelcomeHeader = ({
  activeTab,
  onSetActiveTab,
}: {
  activeTab: number;
  onSetActiveTab: (event: React.SyntheticEvent, value: number) => void;
}) => {
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

      <StyledRightSection>
        <IconButton>
          <SearchIcon sx={{ width: '24px', height: '24px' }} />
        </IconButton>

        <StyledContactsText variant="body2">{t('contacts')}</StyledContactsText>

        <DropDownBox onClick={handleLangClick}>
          <StyledLangText variant="body2">{t('language')}</StyledLangText>
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
          <MenuItem onClick={handleMenuClose}>{t('language')}</MenuItem>
        </Menu>
      </StyledRightSection>
    </StyledContainer>
  );
};
