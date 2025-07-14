import { Calendar, CalendarProps } from 'react-multi-date-picker';

import { CalendarButton } from './CalendarButton';
import { CalendarWrapper } from './DateCalendar.styled';

import { WEEK_START_DAY_INDEX } from 'constants/business/date';

export const DateCalendar = <
  Multiple extends boolean = false,
  Range extends boolean = true,
>(
  props: CalendarProps<Multiple, Range>,
) => {
  return (
    <CalendarWrapper>
      <Calendar<Multiple, Range>
        shadow={false}
        renderButton={<CalendarButton />}
        weekStartDayIndex={WEEK_START_DAY_INDEX}
        {...props}
      />
    </CalendarWrapper>
  );
};
