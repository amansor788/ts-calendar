import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './';

export default class BookingCalendar extends React.Component {

  getMonthDaysCount(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  render() {
    const { bookings } = this.props;
    const dates = {};
    const colors = ['red', 'blue', 'yellow'];
    for (let i = 0; i < bookings.length; i++) {
      let { since, until } = this.props.bookings[i];
      since = new Date(since);
      until = new Date(until);

      const sinceMonth = since.getUTCMonth();
      const sinceYear = since.getUTCFullYear();
      const untilMonth = until.getUTCMonth();
      const untilYear = until.getUTCFullYear();

      const yearsCount = untilYear - sinceYear;
      const monthsCount = (untilMonth - sinceMonth) + (12 * yearsCount) + 1;

      for (let j = 0; j < monthsCount; j++) {
        const color = colors[i % 3];
        const currentYear = sinceYear + Math.floor((sinceMonth + j) / 12);
        let currentMonth = ((sinceMonth + j) % 12) + 1;
        if (currentMonth.toString().length === 1) {
          currentMonth = `0${currentMonth}`;
        }
        const monthId = `${currentYear}-${currentMonth}`;

        if (!dates[monthId]) {
          dates[monthId] = [];
        }

        if (monthsCount > 1) {
          if (j === 0) {
            const sinceLastDayOfMonth = this.getMonthDaysCount(sinceYear, sinceMonth);
            const sinceUntilEndOfMonth = new Date(sinceYear, sinceMonth, sinceLastDayOfMonth);
            dates[monthId].push({
              since, until: sinceUntilEndOfMonth, color,
            });
          } else if (j > 0 && j < monthsCount - 1) {
            const middleMonthLastDayOfMonth = this.getMonthDaysCount(currentYear, currentMonth - 1);
            const middleMonthStartOfMonth = new Date(currentYear, currentMonth - 1, 1);
            const middleMonthEndOfMonth = new Date(currentYear, currentMonth - 1, middleMonthLastDayOfMonth);

            dates[monthId].push({
              since: middleMonthStartOfMonth, until: middleMonthEndOfMonth, color,
            });
          } else if (j === monthsCount - 1) {
            const untilSinceStartOfMonth = new Date(untilYear, untilMonth, 1);
            dates[monthId].push({
              since: untilSinceStartOfMonth, until, color,
            });
          }
        } else {
          dates[monthId].push({
            since, until, color,
          });
        }
      }
    }

    const calendars = [];

    Object.keys(dates).sort().map((monthId) => {
      calendars.push(<Calendar key={monthId} dates={dates[monthId]} />);
    });

    return (
      <div>
        {calendars}
      </div>
    );
  }
}

BookingCalendar.propTypes = {
  bookings: PropTypes.array,
};
