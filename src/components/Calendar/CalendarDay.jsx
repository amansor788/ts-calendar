import React, { Component } from 'react';
import PropTypes from 'prop-types';

const style = {
  width: 36,
  height: 36,
  display: 'inline-block',
  border: '1px solid rgb(224, 224, 224)',
};

export default class CalendarDay extends React.Component {
  render() {
    return (<div style={{ ...style, backgroundColor: this.props.color }}>{this.props.dayNumber}</div>);
  }
}

CalendarDay.propTypes = {
  dayNumber: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  color: PropTypes.string,
};

CalendarDay.defaultProps = {
  color: '#fff',
};
