import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { memo, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { TooltipTitle } from './TooltipTitle';

export interface SpecialCharactersTooltipProps
  extends Omit<TooltipProps, 'title'> {
  children: ReactElement;
}

export const SpecialCharactersTooltip = memo<SpecialCharactersTooltipProps>(
  ({ children, ...tooltipProps }: SpecialCharactersTooltipProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <Tooltip
        slotProps={{
          tooltip: {
            sx: ({ palette, spacing }) => ({
              maxWidth: 'max-content',
              backgroundColor: palette.grey[400],
              padding: spacing(1, 2),
            }),
          },
        }}
        role="status"
        aria-label={t('label.charactersTooltip')}
        title={<TooltipTitle />}
        placement="top"
        {...tooltipProps}
      >
        {children}
      </Tooltip>
    );
  },
);

SpecialCharactersTooltip.displayName = 'SpecialCharactersTooltip';
