import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { StyledHeader, ProductsContainer } from './BackOfficeSidebar.styled';

import { ReactComponent as PlusIcon } from 'assets/icons/PlusIcon.svg';
import { ReactComponent as ViewClientsIcon } from 'assets/icons/ViewClientsIcon.svg';
import { ReactComponent as ViewEmployeesIcon } from 'assets/icons/ViewEmployeesIcon.svg';
import { ReactComponent as WalletIcon } from 'assets/icons/WalletIcon.svg';
import { Logo, LogoutButton, SettingsButton } from 'components/atoms';
import BackOfficeNavigationLink from 'components/molecules/BackOfficeNavigationLinks/BackOfficeNavigationLink';
import {
  BACK_OFFICE_EMPLOYEE_SIGN_IN,
  TO_BACK_OFFICE_CREATE_CLIENT,
  TO_BACK_OFFICE_CREATE_EMPLOYEE,
  TO_BACK_OFFICE_CREATE_PRODUCT,
  TO_BACK_OFFICE_VIEW_CLIENTS,
  TO_BACK_OFFICE_VIEW_EMPLOYEES,
  TO_BACK_OFFICE_VIEW_PRODUCTS,
} from 'constants/navigation/routePaths';
import { DEFAULT_BREAKPOINT_KEYS } from 'constants/ui/layout';
import { removeEmployeeAuthData } from 'utils/auth/storageAuthHandler';

export const BackOfficeSidebar = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    removeEmployeeAuthData();
    navigate(BACK_OFFICE_EMPLOYEE_SIGN_IN);
  };

  return (
    <Box display="flex" flexDirection="column" gap={8} width="100%">
      <Logo color="white" size={DEFAULT_BREAKPOINT_KEYS.xl} labelOnTop={true} />
      <Box display="flex" flexDirection="column" gap={4}>
        <ProductsContainer>
          <StyledHeader>{t('SideBar.productHeader')}</StyledHeader>
          <Box paddingLeft={4} display="flex" flexDirection="column" gap={1.5}>
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
          <Box paddingLeft={4} display="flex" flexDirection="column" gap={1.5}>
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
          <Box paddingLeft={4} display="flex" flexDirection="column" gap={1.5}>
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
      <Box display="flex" gap={1} justifyContent="flex-end">
        <SettingsButton />
        <LogoutButton onClick={handleLogoutClick} />
      </Box>
    </Box>
  );
};
