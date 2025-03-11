import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as PlusIcon } from '../../assets/icons/PlusIcon.svg';
import { ReactComponent as ViewClientsIcon } from '../../assets/icons/ViewClientsIcon.svg';
import { ReactComponent as ViewEmployeesIcon } from '../../assets/icons/ViewEmployeesIcon.svg';
import { ReactComponent as WalletIcon } from '../../assets/icons/WalletIcon.svg';

import {
  StyledHeader,
  ProductsContainer,
} from './BackOfficeLeftSidebar.styled';

import { StyledIcon, StyledLogo } from 'components/atoms/Logo/Logo.styled';
import LogoutButton from 'components/atoms/LogoutButton/LogoutButton';
import SettingsButton from 'components/atoms/SettingsButton/SettingsButton';
import BackOfficeNavigationLink from 'components/molecules/BackOfficeNavigationLinks/BackOfficeNavigationLink';
import {
  TO_BACK_OFFICE_CREATE_CLIENT,
  TO_BACK_OFFICE_CREATE_EMPLOYEE,
  TO_BACK_OFFICE_VIEW_CLIENTS,
  TO_BACK_OFFICE_VIEW_EMPLOYEES,
  TO_BACK_OFFICE_CREATE_PRODUCT,
  TO_BACK_OFFICE_VIEW_PRODUCTS,
  BACK_OFFICE_EMPLOYEE_SIGN_IN,
} from 'constants/routesName';
import { removeEmployeeAuthData } from 'utils/storageAuthHandler';

const BackOfficeLeftSidebar = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    removeEmployeeAuthData();
    navigate(BACK_OFFICE_EMPLOYEE_SIGN_IN);
  };

  return (
    <Box
      width={'100%'}
      sx={{ display: 'flex', flexDirection: 'column', gap: '64px' }}
    >
      <Box color={'white'}>
        <Typography>Millennium Bank</Typography>
        <StyledLogo isSmall={false}>
          <StyledIcon isWhite={true} />
        </StyledLogo>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <ProductsContainer>
          <StyledHeader>{t('SideBar.productHeader')}</StyledHeader>
          <Box
            sx={{
              paddingLeft: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <BackOfficeNavigationLink
              svg={PlusIcon}
              text={t('SideBar.createProduct')}
              link={TO_BACK_OFFICE_CREATE_PRODUCT}
              isFillBasedIcon
            />
            <BackOfficeNavigationLink
              svg={WalletIcon}
              text={t('SideBar.viewProducts')}
              link={TO_BACK_OFFICE_VIEW_PRODUCTS}
            />
          </Box>
        </ProductsContainer>
        <ProductsContainer>
          <StyledHeader>{t('SideBar.employeeHeader')}</StyledHeader>
          <Box
            sx={{
              paddingLeft: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <BackOfficeNavigationLink
              svg={PlusIcon}
              text={t('SideBar.addEmployee')}
              link={TO_BACK_OFFICE_CREATE_EMPLOYEE}
              isFillBasedIcon
            />
            <BackOfficeNavigationLink
              svg={ViewEmployeesIcon}
              text={t('SideBar.viewEmployees')}
              link={TO_BACK_OFFICE_VIEW_EMPLOYEES}
            />
          </Box>
        </ProductsContainer>
        <ProductsContainer>
          <StyledHeader>{t('SideBar.clientHeader')}</StyledHeader>
          <Box
            sx={{
              paddingLeft: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <BackOfficeNavigationLink
              svg={PlusIcon}
              text={t('SideBar.addClient')}
              link={TO_BACK_OFFICE_CREATE_CLIENT}
              isFillBasedIcon
            />
            <BackOfficeNavigationLink
              svg={ViewClientsIcon}
              text={t('SideBar.viewClients')}
              link={TO_BACK_OFFICE_VIEW_CLIENTS}
            />
          </Box>
        </ProductsContainer>
      </Box>
      <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'end' }}>
        <SettingsButton />
        <LogoutButton onClick={handleLogoutClick} />
      </Box>
    </Box>
  );
};

export default BackOfficeLeftSidebar;
