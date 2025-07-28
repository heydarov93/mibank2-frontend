import { styled } from '@mui/material/styles';

import TriangleIcon from 'assets/icons/TriangleIcon.svg';

export const CalendarWrapper = styled('div')(
  ({ theme: { spacing, palette } }) => ({
    '.rmdp-wrapper': {
      border: 'none',
    },
    '.rmdp-calendar': {
      padding: 0,
    },
    '.rmdp-day-picker': {
      gap: spacing(0.75),
      padding: 0,

      '& > div': {
        padding: spacing(2),
      },
    },
    '.rmdp-header': {
      padding: spacing(2),
      margin: 0,
    },
    '.rmdp-header-values': {
      display: 'flex',
      alignIntems: 'center',
      fontWeight: 500,
      fontSize: 0,
      userSelect: 'none',
      span: {
        fontSize: 16,
      },
      '&::after': {
        content: '""',
        display: 'inline-block',
        height: 16,
        width: 16,
        background: `url(${TriangleIcon}) 0 0 no-repeat`,
        marginTop: spacing(0.375),
        marginLeft: spacing(0.5),
      },
    },
    '.rmdp-week': {
      width: 280,
      userSelect: 'none',

      '&:not(:last-child)': {
        marginBottom: spacing(1.5),
      },

      '&:first-of-type': {
        marginBottom: spacing(1),
      },
    },
    '.rmdp-week-day': {
      fontSize: 12,
      lineHeight: 1.33,
      fontWeight: 400,
      color: palette.grey[300],
      width: 31,
      height: 20,
    },
    '.rmdp-day': {
      width: 40,
      height: 40,
      flexShrink: 0,
      borderRadius: '50%',
      color: palette.common.black,

      '&.rmdp-range, .sd:hover': {
        inset: 0,
        background: palette.bg.lightBlue,
        color: palette.common.black,
        boxShadow: 'none',
      },
    },
    'span.rmdp-range.start, span.rmdp-range.end': {
      '&, &:hover': {
        inset: 0,
        color: palette.common.white,
        background: palette.primary.main,
        boxShadow: 'none',
      },
    },
    '.rmdp-today .sd': {
      color: 'inherit',
      backgroundColor: 'inherit',
    },
    '.rmdp-disabled, .rmdp-deactive': {
      color: palette.grey[100],
      pointerEvents: 'none',
    },
  }),
);
