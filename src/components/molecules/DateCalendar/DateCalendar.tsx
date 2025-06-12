import { Calendar, CalendarProps } from 'react-multi-date-picker';

import { CalendarButton } from './CalendarButton';
import { CalendarWrapper } from './DateCalendar.styled';

const MONDAY_START_DAY_INDEX = 1;

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
        weekStartDayIndex={MONDAY_START_DAY_INDEX}
        {...props}
      />
    </CalendarWrapper>
  );
};
