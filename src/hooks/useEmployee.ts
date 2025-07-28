import { debounce } from '@mui/material/utils';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import {
  useDeleteEmployeeMutation,
  useGetEmployeeListQuery,
  useUpdateEmployeeMutation,
} from 'api/services/employee-service/employees.api';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from 'constants/business/pagination';
import { MODAL_DISPLAY_TIMEOUT } from 'constants/ui/layout';
import { SEARCH_LOWEST_LIMIT, SEARCH_VALUE_ZERO } from 'constants/ui/search';
import { TableData } from 'models/ITableData';
import { TSortOrder } from 'types/types';
import { getNextSortOrder } from 'utils/helpers/sortHelpers';

const useEmployees = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const [searchParams, setSearchParams] = useSearchParams();
  const { setValue, control, watch } = useForm();
  const searchInput = watch('searchEmployee');

  const page = Number(searchParams.get('page')) || DEFAULT_PAGE_INDEX;
  const size = Number(searchParams.get('size')) || DEFAULT_PAGE_SIZE;
  const sortDateAdded = searchParams.get('sortDateAdded') || '';
  const sortLastName = searchParams.get('sortLastName') || '';
  const firstName = searchParams.get('firstName') || '';
  const lastName = searchParams.get('lastName') || '';

  const [state, setState] = useState({
    selectedEmp: {} as Partial<TableData>,
    showEditForm: false,
    showDelModal: false,
    actionMsg: '',
    actionMsgBody: '',
    successMsgModal: false,
    failMsgModal: false,
  });

  const { data: employees, refetch: refetchEmployees } =
    useGetEmployeeListQuery({
      page: String(page),
      count: String(size),
      sortDateAdded,
      sortLastName,
      firstName,
      lastName,
    });

  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const totalItems = employees?.totalElements;
  const tableData =
    employees?.data?.map((item: { dateAdded: string | number | Date }) => ({
      ...item,
      dateAdded: new Date(item.dateAdded).toLocaleDateString('en-GB'),
    })) || [];

  const handleSortChange = (field: string) => {
    const newSort = getNextSortOrder(searchParams.get(field) as TSortOrder);
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
        await refetchEmployees();
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
      if (state.selectedEmp.id === undefined) {
        setState((prev) => ({
          ...prev,
          actionMsg: t('ConfirmationWindow.deleteFailed'),
          actionMsgBody: t('GeneralErrors.wentWrongError'),
          failMsgModal: true,
        }));
        return;
      }
      const response = await deleteEmployee(state.selectedEmp.id).unwrap();
      if (response === null) {
        setState((prev) => ({ ...prev, showDelModal: false }));
      }
      setState((prev) => ({
        ...prev,
        actionMsg: t('ConfirmationWindow.deleteTitle'),
        actionMsgBody: t('ConfirmationWindow.deleteEmployeeBody'),
        successMsgModal: true,
      }));
      await refetchEmployees();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        actionMsg: t('ConfirmationWindow.deleteFailed'),
        actionMsgBody: t('GeneralErrors.wentWrongError'),
        failMsgModal: true,
      }));
    }
  };

  const updateSearchParams = (inputValue: string) => {
    if (inputValue.length === SEARCH_VALUE_ZERO) {
      setSearchParams({
        page: String(page),
        size: String(size),
        sortDateAdded: '',
        sortLastName: '',
        firstName: '',
        lastName: '',
      });
    } else if (inputValue.length >= SEARCH_LOWEST_LIMIT) {
      const [firstName, lastName] = inputValue.split(' ');
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: String(page),
        size: String(size),
        firstName: firstName || '',
        lastName: lastName || '',
      });
    }
  };

  const debouncedSearchEnter = useMemo(
    () => debounce(updateSearchParams, 400),
    [searchParams, setSearchParams, size, page],
  );

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputValue = searchInput?.trim() || '';
      debouncedSearchEnter(inputValue);
    }
  };

  const handleViewAll = () => {
    setValue('searchEmployee', '');
    setSearchParams({
      page: String(page),
      size: String(size),
      sortDateAdded: '',
      sortLastName: '',
      firstName: '',
      lastName: '',
    });
    refetchEmployees();
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
      const timer = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          successMsgModal: false,
        }));
      }, MODAL_DISPLAY_TIMEOUT);

      return () => clearTimeout(timer);
    }
  }, [state.successMsgModal]);

  useEffect(() => {
    if (state.failMsgModal) {
      const timer = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          failMsgModal: false,
        }));
      }, MODAL_DISPLAY_TIMEOUT);

      return () => clearTimeout(timer);
    }
  }, [state.failMsgModal]);

  return {
    tableData,
    tableHead,
    page,
    size,
    searchValue: searchInput,
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
  };
};

export default useEmployees;
