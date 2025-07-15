import { Box } from '@mui/material';
import { Control, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledSearchContainer } from './ViewProductsSearchContainer.styled';

import { NoMatchesFound } from 'components/molecules';
import FilterBox from 'components/molecules/FilterBox/FilterBox';
import SearchField from 'components/molecules/SearchField/SearchField';
import { useProductFilters } from 'hooks/useProductFilters';
import { DepositData } from 'models/IProductInfo';

interface ViewProductsSearchContainerProps {
  productsData: DepositData[];
  showNoMatches: boolean;
  onViewAll: () => void;
  onSearchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  control: Control<FieldValues>;
}

export const ViewProductsSearchContainer = ({
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

