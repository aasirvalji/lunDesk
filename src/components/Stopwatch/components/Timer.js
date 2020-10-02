import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Timer.css';

import timeFormat from '../utils/timeFormat';

class Timer extends Component {
  static propTypes = {
    time: PropTypes.number,
  };

  static defaultProps = {
    time: 0,
  };

  render() {
    const { time } = this.props;

    return <div className="Timer">{timeFormat(time)}</div>;
  }
}

export default Timer;
