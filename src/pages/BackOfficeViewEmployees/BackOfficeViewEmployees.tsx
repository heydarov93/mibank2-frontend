import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  BackOfficeViewHeader,
  BackOfficeWarningWindow,
  NoMatchesFound,
} from 'components/molecules';
import BackOfficeConfirmationWindow from 'components/molecules/BackOfficeConfirmationWindow/BackOfficeConfirmationWindow';
import BackOfficeFailWindow from 'components/molecules/BackOfficeFailWindow/BackOfficeFailWindow';
import SearchField from 'components/molecules/SearchField/SearchField';
import BackOfficeEditEmployee from 'components/organisms/BackOfficeEditEmployee/BackOfficeEditEmployee';
import BackOfficeTable from 'components/organisms/BackOfficeTable/BackOfficeTable';
import { TO_BACK_OFFICE_CREATE_EMPLOYEE } from 'constants/routesName';
import useEmployees from 'hooks/useEmployee';
import {
  HeaderContainer,
  MainContainer,
} from 'pages/BackOfficeViewProductsPage/BackOfficeViewProductsPage.styled';

export const BackOfficeViewEmployees = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

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
    handleSearchEnter,
  } = useEmployees();

  return (
    <MainContainer>
      <BackOfficeViewHeader
        path={TO_BACK_OFFICE_CREATE_EMPLOYEE}
        primaryHeader={t('header.employeesList')}
        secondaryHeader={t('header.employeesInfo')}
        btnContent={t('header.addEmployee')}
      />

      <HeaderContainer>
        <Box sx={{ width: '400px', height: '100%' }}>
          <SearchField
            name="searchEmployee"
            control={control}
            placeholder={t('header.searchEmployees')}
            onKeyDown={handleSearchEnter}
          />
          {searchValue && tableData.length === 0 && (
            <NoMatchesFound
              onViewAll={handleViewAll}
              errorTitle={t('noMatchesFound.notFound')}
              errorSubTitle={t('noMatchesFound.tryAgain')}
              viewAllText={t('noMatchesFound.viewAllEmployees')}
            />
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

