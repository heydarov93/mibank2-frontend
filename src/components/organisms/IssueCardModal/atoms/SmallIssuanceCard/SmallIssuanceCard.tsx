import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { CardWrapper } from './SmallIssuanceCard.styled';

import { ReactComponent as CircledCheckIconSVG } from 'assets/icons/CircledCheckIcon.svg';

export interface SmallIssuanceCardProps {
  name: string;
  fee: string;
  background: string;
  sx?: SxProps<Theme>;
  selected?: boolean;
  onClick?: () => void;
}

export const SmallIssuanceCard = ({
  name,
  fee,
  selected,
  background,
  sx,
  onClick,
}: SmallIssuanceCardProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssuanceCard' });

  return (
    <CardWrapper
      selected={selected}
      background={background}
      sx={sx}
      onClick={onClick}
      data-testid="small-issuance-card"
    >
      <Stack
        alignItems="flex-end"
        gap={1}
        justifyContent="space-between"
        height="100%"
      >
        <Stack direction="row" alignItems="center" width="100%" gap="4px">
          {selected && <CircledCheckIconSVG style={{ flexShrink: 0 }} />}
          <Typography
            fontWeight={500}
            lineHeight={1.18}
            textAlign="right"
            sx={{ ml: 'auto' }}
          >
            {name}
          </Typography>
        </Stack>
        <Stack alignItems="flex-end">
          <Typography fontSize={12} lineHeight={1.33}>
            {t('issuanceFee')}
          </Typography>
          <Typography fontSize={14} fontWeight={500} lineHeight={1.15}>
            {fee}
          </Typography>
        </Stack>
      </Stack>
    </CardWrapper>
  );
};
