import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Icon from '@mui/material/Icon';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, To } from 'react-router-dom';

import {
  StyledIconButton,
  StyledLink,
  StyledTitle,
  StyledTopContainer,
} from './Section.styled';

interface SectionProps {
  title: string;
  seeAllRoute: To;
  onAddProduct?: () => void;
  children?: ReactNode;
}

export function Section({
  title,
  onAddProduct,
  seeAllRoute,
  children,
}: SectionProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar',
  });
  return (
    <Stack gap={4} fontFamily="Urbanist">
      <StyledTopContainer>
        <Stack flexDirection="row" gap={2} alignItems="center">
          <StyledTitle data-testid="section-title">{title}</StyledTitle>

          {onAddProduct && (
            <StyledIconButton
              onClick={onAddProduct}
              data-testid="add-product-button"
            >
              <AddIcon sx={{ fontSize: '20px' }} />
            </StyledIconButton>
          )}
        </Stack>

        <StyledLink component={RouterLink} to={seeAllRoute}>
          <Typography fontFamily="inherit" fontWeight={500}>
            {t('seeAll')}
          </Typography>
          <Icon color="inherit" sx={{ lineHeight: 1 }}>
            <ChevronRightIcon />
          </Icon>
        </StyledLink>
      </StyledTopContainer>
      {children}
    </Stack>
  );
}
