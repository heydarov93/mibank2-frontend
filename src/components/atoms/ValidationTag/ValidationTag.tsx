import { SxProps, Theme } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { TagInfoIcon } from '../TagInfoIcon/TagInfoIcon';
import { TagStatusIcon } from '../TagStatusIcon/TagStatusIcon';

import { StyledContainer } from './ValidationTag.styled';

interface ValidationTagProps {
  text: string;
  isValidated?: boolean;
  withInfo?: boolean;
  sx?: SxProps<Theme>;
}

export const ValidationTag = memo<ValidationTagProps>(
  ({
    text,
    isValidated = false,
    withInfo = false,
    ...props
  }: ValidationTagProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <StyledContainer
        sx={({ palette }) => ({
          backgroundColor: isValidated
            ? palette.primary.light
            : palette.error.light,
        })}
        id={text}
        role="status"
        aria-live="polite"
        aria-labelledby={text}
        aria-expanded={isValidated}
        aria-label={`${t('label.validationTag', { tag: isValidated ? 'passed' : 'failed' })} : ${text}`}
        {...props}
      >
        <TagStatusIcon isValidated={isValidated} /> <span>{text}</span>{' '}
        {withInfo && <TagInfoIcon />}
      </StyledContainer>
    );
  },
);

ValidationTag.displayName = 'ValidationTag';
