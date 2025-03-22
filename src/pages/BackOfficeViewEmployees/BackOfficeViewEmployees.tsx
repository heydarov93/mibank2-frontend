import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { useViewEmployeeQuery } from 'api/employeeController';
import { SubmitButton } from 'components/atoms';
import ButtonPlusIcon from 'components/atoms/ButtonPlusIcon/ButtonPlusIcon';
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
import { getNextSortOrder } from 'utils/sortUtils';

const BackOfficeViewEmployees = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const { control } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 0;
  const size = Number(searchParams.get('size')) || 10;
  const sortDateAdded = searchParams.get('sortDateAdded') || '';
  const sortLastName = searchParams.get('sortLastName') || '';

  const { data } = useViewEmployeeQuery({
    page,
    size,
    sortDateAdded,
    sortLastName,
  });

  const tableData =
    data?.data?.map((item: { dateAdded: string | number | Date }) => ({
      ...item,
      dateAdded: new Date(item.dateAdded).toLocaleDateString('en-GB'),
    })) || [];

  const handleSortChange = (field: 'sortDateAdded' | 'sortLastName') => {
    const newSort = getNextSortOrder(searchParams.get(field) || '');
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [field]: newSort || '',
    });
  };

  const tableHead = [
    { label: t('employeeList.firstName'), key: 'firstName' },
    {
      label: t('employeeList.lastName'),
      key: 'lastName',
      sortable: true,
      order: sortLastName,
      onSort: () => handleSortChange('sortLastName'),
    },
    { label: t('employeeList.role'), key: 'role' },
    { label: t('employeeList.email'), key: 'email' },
    {
      label: t('employeeList.addedDate'),
      key: 'dateAdded',
      sortable: true,
      order: sortDateAdded,
      onSort: () => handleSortChange('sortDateAdded'),
    },
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
        <SubmitButton
          startIcon={<ButtonPlusIcon />}
          buttonContent={t('header.addEmployee')}
        />
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
      <BackOfficeTable
        tableHead={tableHead}
        tableBody={tableData}
        totalItems={data?.totalElements || 0}
        page={page}
        pageSize={size}
        onPageChange={(newPage) =>
          setSearchParams({
            ...Object.fromEntries(searchParams),
            page: newPage.toString(),
          })
        }
        onPageSizeChange={(newSize) =>
          setSearchParams({
            ...Object.fromEntries(searchParams),
            size: newSize.toString(),
          })
        }
      />
    </MainContainer>
  );
};

export default BackOfficeViewEmployees;
