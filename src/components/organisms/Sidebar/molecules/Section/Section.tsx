import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Icon, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import {
  StyledIconButton,
  StyledLink,
  StyledTitle,
  StyledTopContainer,
} from './Section.styled';

interface SectionProps {
  title: string;
  onSeeAll: () => void;
  onAddProduct?: () => void;
  children?: ReactNode;
}

export function Section({ title, onAddProduct, children }: SectionProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'MainPage.sidebar',
  });
  return (
    <Stack gap={4} fontFamily="Urbanist">
      <StyledTopContainer>
        <Stack flexDirection="row" gap={2} alignItems="center">
          <StyledTitle>{title}</StyledTitle>

          {onAddProduct && (
            <StyledIconButton onClick={onAddProduct}>
              <AddIcon sx={{ fontSize: '20px' }} />
            </StyledIconButton>
          )}
        </Stack>

        <StyledLink component={RouterLink} to="/">
          <Typography fontFamily="inherit" fontWeight={500}>
            {t('seeAll')}
          </Typography>
          <Icon color="inherit" sx={{ lineHeight: 1 }}>
            <ChevronRightIcon />
          </Icon>
        </StyledLink>
      </StyledTopContainer>
      {children ?? (
        <Typography
          fontFamily="inherit"
          fontSize={16}
          color="grey.400"
          fontWeight={500}
          textAlign="center"
        >
          {t('emptySection')}
        </Typography>
      )}
    </Stack>
  );
}
