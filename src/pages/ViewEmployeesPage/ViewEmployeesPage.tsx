import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledContainer } from './ViewEmployeesPage.styled';

import {
  BackOfficeViewHeader,
  BackOfficeWarningWindow,
} from 'components/molecules';
import BackOfficeConfirmationWindow from 'components/molecules/BackOfficeConfirmationWindow/BackOfficeConfirmationWindow';
import BackOfficeFailWindow from 'components/molecules/BackOfficeFailWindow/BackOfficeFailWindow';
import { ViewEmployeesSearchContainer } from 'components/organisms';
import BackOfficeEditEmployee from 'components/organisms/BackOfficeEditEmployee/BackOfficeEditEmployee';
import BackOfficeTable from 'components/organisms/BackOfficeTable/BackOfficeTable';
import { TO_BACK_OFFICE_CREATE_EMPLOYEE } from 'constants/navigation/routePaths';
import useEmployees from 'hooks/useEmployee';

export const ViewEmployeesPage = () => {
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

  const paramsObj = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams({ ...paramsObj, page: newPage.toString() });
    },
    [paramsObj, setSearchParams],
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      setSearchParams({ ...paramsObj, size: newSize.toString() });
    },
    [paramsObj, setSearchParams],
  );

  const {
    showEditForm,
    failMsgModal,
    successMsgModal,
    showDelModal,
    actionMsg,
    actionMsgBody,
    selectedEmp,
  } = state;

  const closeEditForm = useCallback(
    () => setState((prev) => ({ ...prev, showEditForm: false })),
    [setState],
  );
  const closeFailModal = useCallback(
    () =>
      setState((prev) => ({
        ...prev,
        failMsgModal: false,
        actionMsg: '',
        actionMsgBody: '',
      })),
    [setState],
  );
  const closeSuccessModal = useCallback(
    () =>
      setState((prev) => ({
        ...prev,
        successMsgModal: false,
        actionMsg: '',
        actionMsgBody: '',
      })),
    [setState],
  );
  const closeDeleteModal = useCallback(
    () => setState((prev) => ({ ...prev, showDelModal: false })),
    [setState],
  );

  const showNoMatches = searchValue && tableData.length === 0;

  return (
    <StyledContainer>
      <BackOfficeViewHeader
        path={TO_BACK_OFFICE_CREATE_EMPLOYEE}
        primaryHeader={t('header.employeesList')}
        secondaryHeader={t('header.employeesInfo')}
        btnContent={t('header.addEmployee')}
      />
      <ViewEmployeesSearchContainer
        onSearchEnter={handleSearchEnter}
        onViewAll={handleViewAll}
        showNoMatches={showNoMatches}
        control={control}
      />
      <BackOfficeTable
        tableHead={tableHead}
        tableBody={tableData}
        totalItems={totalItems}
        page={page}
        pageSize={size}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onEditClick={handleEdit}
        onDeleteClick={handleDeleteModal}
      />
      {showEditForm && (
        <BackOfficeEditEmployee
          handleClose={closeEditForm}
          formData={selectedEmp}
          handleUpdate={handleUpdate}
          open
        />
      )}
      {failMsgModal && (
        <BackOfficeFailWindow
          onClose={closeFailModal}
          title={actionMsg}
          body={actionMsgBody}
          sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      )}
      {successMsgModal && (
        <BackOfficeConfirmationWindow
          onClose={closeSuccessModal}
          title={actionMsg}
          body={actionMsgBody}
          sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      )}
      {showDelModal && (
        <BackOfficeWarningWindow
          open
          onCancelClick={closeDeleteModal}
          title={t('warningWindow.deleteEmployee')}
          text={t('warningWindow.deleteEmployeeText')}
          onDeleteClick={handleDelete}
          employee={selectedEmp}
        />
      )}
    </StyledContainer>
  );
};
