import React from 'react';
import PropTypes from 'prop-types';
import CalendarRow from './CalendarRow';
import CalendarDay from './CalendarDay';

export default class CalendarHeader extends React.Component {

  render() {
    return(
      <div>
        <CalendarRow style={{ textAlign: 'center' }}>
          {this.props.month} - {this.props.year}
        </CalendarRow>
        <CalendarRow>
          <CalendarDay dayNumber="Dom" />
          <CalendarDay dayNumber="Lun" />
          <CalendarDay dayNumber="Mar" />
          <CalendarDay dayNumber="Mie" />
          <CalendarDay dayNumber="Jue" />
          <CalendarDay dayNumber="Vie" />
          <CalendarDay dayNumber="Sab" />
        </CalendarRow>
      </div>
    );
  }
}

CalendarHeader.propTypes = {
  month: PropTypes.string,
  year: PropTypes.number,
};
