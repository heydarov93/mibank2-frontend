import { Box } from '@mui/material';
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledSearchContainer } from './EmployeesSearchContainer.styled';

import { NoMatchesFound, SearchField } from 'components/molecules';

interface ViewEmployeesSearchContainerProps {
  showNoMatches: boolean;
  onViewAll: () => void;
  onSearchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  control: Control<FieldValues>;
}

export const EmployeesSearchContainer = ({
  showNoMatches,
  onViewAll,
  onSearchEnter,
  control,
}: ViewEmployeesSearchContainerProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  return (
    <StyledSearchContainer>
      <Box sx={{ width: '400px', height: '100%' }}>
        <SearchField
          name="searchEmployee"
          control={control}
          placeholder={t('header.searchEmployees')}
          onKeyDown={onSearchEnter}
        />
        {showNoMatches && (
          <NoMatchesFound
            onViewAll={onViewAll}
            errorTitle={t('noMatchesFound.notFound')}
            errorSubTitle={t('noMatchesFound.tryAgain')}
            viewAllText={t('noMatchesFound.viewAllEmployees')}
          />
        )}
      </Box>
    </StyledSearchContainer>
  );
};
