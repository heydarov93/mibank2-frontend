import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SubmitButton } from 'components/atoms';
import ButtonPlusIcon from 'components/atoms/ButtonPlusIcon/ButtonPlusIcon';
import { BackOfficeWarningWindow } from 'components/molecules';
import BackOfficeConfirmationWindow from 'components/molecules/BackOfficeConfirmationWindow/BackOfficeConfirmationWindow';
import BackOfficeFailWindow from 'components/molecules/BackOfficeFailWindow/BackOfficeFailWindow';
import NoMatchesFound from 'components/molecules/NoMatchesFound/NoMatchesFound';
import SearchField from 'components/molecules/SearchField/SearchField';
import BackOfficeEditEmployee from 'components/organisms/BackOfficeEditEmployee/BackOfficeEditEmployee';
import BackOfficeTable from 'components/organisms/BackOfficeTable/BackOfficeTable';
import { TO_BACK_OFFICE_CREATE_EMPLOYEE } from 'constants/routesName';
import useEmployees from 'hooks/useEmployee';
import {
  HeaderContainer,
  MainContainer,
} from 'pages/BackOfficeViewProductsPage/BackOfficeViewProductsPage.styled';

const BackOfficeViewEmployees = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const navigate = useNavigate();

  const {
    tableData,
    tableHead,
    page,
    size,
    searchValue,
    searchParams,
    totalItems,
    control,
    setSearchParams,
    state,
    setState,
    handleEdit,
    handleUpdate,
    handleDeleteModal,
    handleDelete,
    handleViewAll,
    handleSearchChange,
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
          onClick={() => {
            navigate(TO_BACK_OFFICE_CREATE_EMPLOYEE);
          }}
        />
      </Box>

      <HeaderContainer>
        <Box sx={{ width: '400px', height: '100%' }}>
          <SearchField
            placeholder={t('header.searchEmployees')}
            name="searchEmployee"
            control={control}
            onSearchChange={handleSearchChange}
          />
          {searchValue && tableData.length === 0 && (
            <NoMatchesFound onViewAll={handleViewAll} />
          )}
        </Box>
      </HeaderContainer>

      <BackOfficeTable
        tableHead={tableHead}
        tableBody={tableData}
        totalItems={totalItems}
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
          handleClose={() =>
            setState((prev) => ({ ...prev, showEditForm: false }))
          }
          formData={state.selectedEmp}
          handleUpdate={handleUpdate}
          open={state.showEditForm}
        />
      )}

      {state.failMsgModal && (
        <BackOfficeFailWindow
          onClose={() =>
            setState((prev) => ({
              ...prev,
              failMsgModal: false,
              actionMsg: '',
              actionMsgBody: '',
            }))
          }
          title={state.actionMsg}
          body={state.actionMsgBody}
          sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      )}

      {state.successMsgModal && (
        <BackOfficeConfirmationWindow
          onClose={() =>
            setState((prev) => ({
              ...prev,
              successMsgModal: false,
              actionMsg: '',
              actionMsgBody: '',
            }))
          }
          title={state.actionMsg}
          body={state.actionMsgBody}
          sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      )}

      {state.showDelModal && (
        <BackOfficeWarningWindow
          onCancelClick={() =>
            setState((prev) => ({ ...prev, showDelModal: false }))
          }
          title={t('warningWindow.deleteEmployee')}
          text={t('warningWindow.deleteEmployeeText')}
          onDeleteClick={handleDelete}
          employee={state.selectedEmp}
          open={state.showDelModal}
        />
      )}
    </MainContainer>
  );
};

export default BackOfficeViewEmployees;
