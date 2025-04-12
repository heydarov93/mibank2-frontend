import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import {
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useViewEmployeeQuery,
} from 'api/employeeController';
import { TableData } from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';
import { getNextSortOrder } from 'utils/sortUtils';

const useEmployees = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 0;
  const size = Number(searchParams.get('size')) || 10;
  const sortDateAdded = searchParams.get('sortDateAdded') || '';
  const sortLastName = searchParams.get('sortLastName') || '';

  const [state, setState] = useState({
    selectedEmp: {} as Partial<TableData>,
    showEditForm: false,
    showDelModal: false,
    actionMsg: '',
    actionMsgBody: '',
    successMsgModal: false,
    failMsgModal: false,
  });

  const { data: employees, refetch } = useViewEmployeeQuery({
    page,
    size,
    sortDateAdded,
    sortLastName,
  });

  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const tableData =
    employees?.data?.map((item: { dateAdded: string | number | Date }) => ({
      ...item,
      dateAdded: new Date(item.dateAdded).toLocaleDateString('en-GB'),
    })) || [];
  const totalItems = employees?.totalElements;

  const handleSortChange = (field: string) => {
    const newSort = getNextSortOrder(searchParams.get(field) || '');
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [field]: newSort || '',
    });
  };

  const handleEdit = (item: Partial<TableData>) => {
    setState((prev) => ({
      ...prev,
      showEditForm: true,
      showDelModal: false,
      selectedEmp: {
        ...item,
        dateAdded: dayjs(item.dateAdded).format('YYYY-MM-DD'),
        firstName: item.firstName || '',
        lastName: item.lastName || '',
      },
    }));
  };

  const handleUpdate = async (employee: Partial<TableData>) => {
    try {
      const response = await updateEmployee(employee).unwrap();
      if (response?.id) {
        setState((prev) => ({
          ...prev,
          actionMsg: t('ConfirmationWindow.updateTitle'),
          actionMsgBody: t('ConfirmationWindow.updateEmployeeBody'),
          successMsgModal: true,
        }));
        await refetch();
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        actionMsg: t('ConfirmationWindow.updateFailed'),
        actionMsgBody: t('GeneralErrors.wentWrongError'),
        failMsgModal: true,
      }));
    }
  };

  const handleDeleteModal = (item: Partial<TableData>) => {
    setState((prev) => ({
      ...prev,
      showDelModal: true,
      showEditForm: false,
      selectedEmp: item,
    }));
  };

  const handleDelete = async () => {
    try {
      const response = await deleteEmployee(state.selectedEmp).unwrap();
      if (response === null) {
        setState((prev) => ({ ...prev, showDelModal: false }));
      }
      setState((prev) => ({
        ...prev,
        actionMsg: t('ConfirmationWindow.deleteTitle'),
        actionMsgBody: t('ConfirmationWindow.deleteEmployeeBody'),
        successMsgModal: true,
      }));
      await refetch();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        actionMsg: t('ConfirmationWindow.deleteFailed'),
        actionMsgBody: t('GeneralErrors.wentWrongError'),
        failMsgModal: true,
      }));
    }
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

  useEffect(() => {
    if (state.successMsgModal) {
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          successMsgModal: false,
        }));
      }, 4000);
    }
  }, [state.successMsgModal]);

  useEffect(() => {
    if (state.failMsgModal) {
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          failMsgModal: false,
        }));
      }, 4000);
    }
  }, [state.failMsgModal]);

  return {
    tableData,
    tableHead,
    page,
    size,
    totalItems,
    searchParams,
    setSearchParams,
    state,
    setState,
    handleEdit,
    handleUpdate,
    handleDeleteModal,
    handleDelete,
  };
};

export default useEmployees;
