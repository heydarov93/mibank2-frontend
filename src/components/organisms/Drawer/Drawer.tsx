import { Menu, LogoutOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import {
  StyledDrawerContainer,
  StyledListItemButton,
  StyledUserCardContainer,
} from './Drawer.styled';

import { UserCard } from 'components/molecules';
import { navMenuLinks, personalMenuLinks } from 'constants/navigation';

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const { t } = useTranslation('translation', { keyPrefix: 'header.navMenu' });

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <StyledUserCardContainer>
        <UserCard
          // TODO: need delete mock data
          user={{
            firstName: 'Alexandra',
            lastName: 'Vegas',
          }}
          isViceversa
        />
      </StyledUserCardContainer>
      <Divider />
      <List>
        {navMenuLinks.map(({ path, content, icon }) => (
          <ListItem key={content} disablePadding>
            <ListItemButton component={StyledListItemButton} to={path}>
              <ListItemIcon sx={{ minWidth: '40px' }}>{icon}</ListItemIcon>
              <ListItemText primary={t(content)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {personalMenuLinks.map(({ path, content, icon }) => (
          <ListItem key={content} disablePadding>
            <ListItemButton component={NavLink} to={path}>
              <ListItemIcon sx={{ minWidth: '40px' }}>{icon}</ListItemIcon>
              <ListItemText primary={t(content)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to={'/'}>
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText primary={t('logOut')} />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <StyledDrawerContainer>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={toggleDrawer(true)}
        sx={{ ...(open && { display: 'none' }) }}
      >
        <Menu />
      </IconButton>

      <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </StyledDrawerContainer>
  );
}
