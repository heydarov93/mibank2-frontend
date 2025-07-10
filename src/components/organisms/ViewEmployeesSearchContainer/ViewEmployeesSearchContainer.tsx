import { Box } from '@mui/material';
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledSearchContainer } from './ViewEmployeesSearchContainer.styled';

import { NoMatchesFound } from 'components/molecules';
import SearchField from 'components/molecules/SearchField/SearchField';

interface ViewEmployeesSearchContainerProps {
  showNoMatches: boolean;
  onViewAll: () => void;
  onSearchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  control: Control<FieldValues>;
}

export const ViewEmployeesSearchContainer = ({
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
