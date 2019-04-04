import React from 'react';
import PropTypes from 'prop-types';
import CalendarHeader from './CalendarHeader';
import CalendarRow from './CalendarRow';
import CalendarDay from './CalendarDay';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const sinceMonth = props.dates[0].since.getUTCMonth();
    const sinceYear = props.dates[0].since.getUTCFullYear();
    //const untilMonth = props.until.getMonth();
    //const untilYear = props.until.getFullYear();

    const monthDaysCount = this.getMonthDaysCount(sinceYear, sinceMonth);
    const daysColors = [];
    for (let i = 0; i < monthDaysCount; i++) {
      daysColors.push('#fff');
    }

    this.state = {
      daysColors,
    };
  }

  componentWillMount() {
    const { dates } = this.props;

    this.paintRanges(dates);
  }

  getFirstDayOfMonth(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);

    return firstDayOfMonth.getUTCDay();
  }

  getMonthDaysCount(year, month) {
    return new Date(year, month + 1, 0).getUTCDate();
  }

  paintRange(daysColors, date) {
    const { since, until, color } = date;
    const sinceDay = since.getUTCDate();
    const untilDay = until.getUTCDate();

    const updatedDaysColors = [...daysColors];
    for (let i = sinceDay; i <= untilDay; i++) {
      updatedDaysColors[i] = color;
    }

    return updatedDaysColors;
  }

  paintRanges(dates) {
    let daysColors = [...this.state.daysColors];

    dates.map((date) => {
      daysColors = this.paintRange(daysColors, date);
      return daysColors;
    });

    this.setState({ daysColors });
  }

  render() {
    const { since } = this.props.dates[0];
    const sinceYear = since.getUTCFullYear();
    const sinceMonth = since.getUTCMonth();
    const firstDayOfMonth = this.getFirstDayOfMonth(sinceYear, sinceMonth);
    const monthDaysCount = this.getMonthDaysCount(sinceYear, sinceMonth);

    const rowCount = Math.ceil((monthDaysCount + firstDayOfMonth) / 7);
    const grid = [
      <CalendarHeader
        key={'header'}
        month={this.months[sinceMonth]}
        year={sinceYear}
      />,
    ];
    for (let i = 0; i < rowCount; i += 1) {
      const days = [];
      for (let j = 0; j < 7; j += 1) {
        let dayNumber = j + 1 - firstDayOfMonth + (i * 7);
        if (dayNumber < 1 || dayNumber > monthDaysCount) {
          dayNumber = '';
        }
        days.push(<CalendarDay
          key={`day-${i}-${j}`}
          dayNumber={dayNumber || '0'}
          color={this.state.daysColors[dayNumber]}
        />);
      }

      const row = <CalendarRow key={`week-${i}`}>{days}</CalendarRow>;
      grid.push(row);
    }

    return (
      <div>
        {grid}
      </div>
    );
  }
}

Calendar.propTypes = {
  dates: PropTypes.arrayOf(
    PropTypes.shape({
      since: PropTypes.instanceOf(Date),
      until: PropTypes.instanceOf(Date),
      color: PropTypes.string,
    })
  ),
};

export default Calendar;
