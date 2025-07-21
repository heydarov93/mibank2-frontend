import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as ReloadSVG } from 'assets/icons/Reload.svg';

interface ReloadButtonProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const ReloadButton = memo<ReloadButtonProps>(
  ({ sx, ...props }: ReloadButtonProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = useCallback(() => {
      navigate(location.pathname, { replace: true });
    }, [navigate, location.pathname]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<SVGSVGElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      },
      [handleClick],
    );

    return (
      <SvgIcon
        sx={{ cursor: 'pointer', ...sx }}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        role="button"
        data-testid="reload-button"
        aria-label={t('label.reload')}
        {...props}
      >
        <ReloadSVG />
      </SvgIcon>
    );
  },
);

ReloadButton.displayName = 'ReloadButton';
