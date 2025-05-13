import { useState } from 'react';

import { TableData } from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';
import {
  initialProductSubtypes,
  initialProductTypes,
} from 'constants/productTableHead';
import { ProductType } from 'enums/EProductType';
import { FilterGroup } from 'models/IFilterInfo';

export const useProductFilters = (mappedData: Partial<TableData>[]) => {
  const [productSubtypes, setProductSubtypes] = useState<FilterGroup[]>(
    initialProductSubtypes,
  );
  const [productTypes, setProductTypes] =
    useState<FilterGroup[]>(initialProductTypes);

  const handleFilterChange = (
    updatedGroups: FilterGroup[],
    setFilterState: React.Dispatch<React.SetStateAction<FilterGroup[]>>,
  ) => {
    setFilterState(updatedGroups);
  };

  const getSelectedFilterValues = () => {
    const selectedProductTypes = productTypes[0].options
      .filter((option) => option.checked)
      .map((option) => option.name);

    const selectedSubtypes = productSubtypes.flatMap((group) =>
      group.options
        .filter((option) => option.checked)
        .map((option) => option.label),
    );

    return { selectedProductTypes, selectedSubtypes };
  };

  const filteredTableBody = () => {
    const { selectedProductTypes, selectedSubtypes } =
      getSelectedFilterValues();

    return mappedData.filter((item: Partial<TableData>) => {
      const isProductTypeMatch =
        (selectedProductTypes.includes('deposits') &&
          item.productType === ProductType.DEPOSIT) ||
        (selectedProductTypes.includes('cards') &&
          item.productType === ProductType.CARD);
      const isSubtypeMatch = selectedSubtypes.includes(
        item.productSubtype || '',
      );
      return isProductTypeMatch && isSubtypeMatch;
    });
  };

  return {
    productSubtypes,
    productTypes,
    handleFilterChange,
    filteredTableBody,
    setProductSubtypes,
    setProductTypes,
  };
};
