import React, { Component } from 'react';
import PropTypes from 'prop-types';

const style = {
  width: '252px',
};

export default class CalendarRow extends React.Component {

  getStyles() {
    return { ...style, ...this.props.style };
  }

  render() {
    return (
      <div style={this.getStyles()}>
        {this.props.children}
      </div>
    );
  }
}

CalendarRow.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};
