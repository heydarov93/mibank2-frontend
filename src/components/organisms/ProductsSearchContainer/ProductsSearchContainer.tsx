import Box from '@mui/material/Box';
import { Control, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledSearchContainer } from './ProductsSearchContainer.styled';

import { FilterBox, NoMatchesFound, SearchField } from 'components/molecules';
import { useProductFilters } from 'hooks/product/useProductFilters';
import { DepositData } from 'models/IProductInfo';

interface ViewProductsSearchContainerProps {
  productsData: DepositData[];
  showNoMatches: boolean;
  onViewAll: () => void;
  onSearchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  control: Control<FieldValues>;
}

export const ProductsSearchContainer = ({
  productsData,
  showNoMatches,
  onViewAll,
  onSearchEnter,
  control,
}: ViewProductsSearchContainerProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const {
    productSubtypes,
    productTypes,
    setProductSubtypes,
    setProductTypes,
    handleFilterChange,
  } = useProductFilters(productsData);

  return (
    <StyledSearchContainer>
      <Box sx={{ width: '400px', height: '100%' }}>
        <SearchField
          name="productSearch"
          control={control}
          placeholder={t('header.searchProducts')}
          onKeyDown={onSearchEnter}
          data-testid="product-search"
        />
        {showNoMatches && (
          <NoMatchesFound
            onViewAll={onViewAll}
            errorTitle={t('noMatchesFound.notFound')}
            errorSubTitle={t('noMatchesFound.tryAgain')}
            viewAllText={t('noMatchesFound.viewAllProducts')}
          />
        )}
      </Box>
      <FilterBox
        title={t('header.products')}
        groups={productTypes}
        onFilterChange={(updatedGroups) =>
          handleFilterChange(updatedGroups, setProductTypes)
        }
      />
      <FilterBox
        title={t('header.productSubtypes')}
        groups={productSubtypes}
        onFilterChange={(updatedGroups) =>
          handleFilterChange(updatedGroups, setProductSubtypes)
        }
      />
    </StyledSearchContainer>
  );
};
