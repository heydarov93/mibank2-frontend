import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubmitButton } from 'components/atoms';
import ButtonPlusIcon from 'components/atoms/ButtonPlusIcon/ButtonPlusIcon';
import { BackOfficeWarningWindow } from 'components/molecules';
import BackOfficeConfirmationWindow from 'components/molecules/BackOfficeConfirmationWindow/BackOfficeConfirmationWindow';
import SearchField from 'components/molecules/SearchField/SearchField';
import BackOfficeEditEmployee from 'components/organisms/BackOfficeEditEmployee/BackOfficeEditEmployee';
import BackOfficeTable from 'components/organisms/BackOfficeTable/BackOfficeTable';
import useEmployees from 'hooks/useEmployee';
import {
  HeaderContainer,
  MainContainer,
} from 'pages/BackOfficeViewProductsPage/BackOfficeViewProductsPage.styled';

const BackOfficeViewEmployees = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const { control } = useForm();

  const {
    tableData,
    tableHead,
    page,
    size,
    searchParams,
    setSearchParams,
    state,
    setState,
    handleEdit,
    handleUpdate,
    handleDeleteModal,
    handleDelete,
  } = useEmployees();

  return (
    <MainContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h1>{t('header.employeesList')}</h1>
          <h2>{t('header.employeesInfo')}</h2>
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
        totalItems={tableData.length}
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
        onEditClick={handleEdit}
        onDeleteClick={handleDeleteModal}
      />

      {state.showEditForm && (
        <BackOfficeEditEmployee
          formData={state.selectedEmp}
          handleClose={() =>
            setState((prev) => ({ ...prev, showEditForm: false }))
          }
          handleUpdate={handleUpdate}
        />
      )}

      {state.successMsgModal && (
        <BackOfficeConfirmationWindow
          onClose={() =>
            setState((prev) => ({
              ...prev,
              successMsgModal: false,
              actionMsg: '',
            }))
          }
          title={state.actionMsg}
        />
      )}

      {state.showDelModal && (
        <BackOfficeWarningWindow
          onCancelClick={() =>
            setState((prev) => ({ ...prev, showDelModal: false }))
          }
          title={t('warningWindow.deleteEmployee')}
          text={t('warningWindow.deleteEmployeeText', {
            firstName: state.selectedEmp.firstName,
            lastName: state.selectedEmp.lastName,
          })}
          onDeleteClick={handleDelete}
        />
      )}
    </MainContainer>
  );
};

export default BackOfficeViewEmployees;
