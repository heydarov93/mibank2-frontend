import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { IPagination } from 'models/IPagination';

export const usePaginationInfo = (
  count: number,
  page: number,
  rowsPerPage: number,
): IPagination => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'TablePagination',
  });

  return useMemo(() => {
    if (count === 0 || rowsPerPage <= 0) {
      return {
        start: 0,
        end: 0,
        total: count,
        pageDisplayText: t('pageDisplayText', {
          start: 0,
          end: 0,
          count,
        }),
        hasNextPage: false,
        hasPreviousPage: false,
        totalPages: 0,
        isEmpty: true,
      };
    }

    const totalPages = Math.ceil(count / rowsPerPage);
    const validPage = Math.max(0, Math.min(page, totalPages - 1));
    const start = validPage * rowsPerPage + 1;
    const end = Math.min(count, (validPage + 1) * rowsPerPage);
    const hasNextPage = validPage < totalPages - 1;
    const hasPreviousPage = validPage > 0;

    return {
      start,
      end,
      total: count,
      pageDisplayText: t('pageDisplayText', {
        start,
        end,
        count,
      }),
      hasNextPage,
      hasPreviousPage,
      totalPages,
      isEmpty: false,
    };
  }, [count, page, rowsPerPage]);
};
