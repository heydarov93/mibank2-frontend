import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useViewEmployeeQuery } from 'api/employeeController';
import { SubmitButton } from 'components/atoms';
import {
  PrimaryHeader,
  SecondaryHeader,
} from 'components/molecules/BackOfficeViewProductsHeader/BackOfficeViewProductsHeader.styled';
import SearchField from 'components/molecules/SearchField/SearchField';
import BackOfficeTable from 'components/organisms/BackOfficeTable/BackOfficeTable';
import {
  HeaderContainer,
  MainContainer,
} from 'pages/BackOfficeViewProductsPage/BackOfficeViewProductsPage.styled';

const BackOfficeViewEmployees = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const { control } = useForm();
  const { data } = useViewEmployeeQuery({});
  const tableData = data?.content;

  const tableHead = [
    t('employeeList.firstName'),
    t('employeeList.lastName'),
    t('employeeList.role'),
    t('employeeList.email'),
    t('employeeList.addedDate'),
  ];

  return (
    <MainContainer>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <PrimaryHeader>{t('header.employeesList')}</PrimaryHeader>
          <SecondaryHeader>{t('header.employeesInfo')}</SecondaryHeader>
        </Box>
        <SubmitButton buttonContent={t('header.addEmployee')} />
      </Box>
      <HeaderContainer>
        <Box sx={{ width: '400px', height: '100%' }}>
          <SearchField
            placeholder={t('header.searchEmployees')}
            name="searchEmployee"
            control={control}
          />
        </Box>
      </HeaderContainer>
      <BackOfficeTable tableHead={tableHead} tableBody={tableData} />
    </MainContainer>
  );
};

export default BackOfficeViewEmployees;
