import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LapTimeList.css';

import LapTime from './LapTime';

class LapTimeList extends Component {
  static proptTypes = {
    timeList: PropTypes.array,
  };

  static defaultProps = {
    timeList: [],
  };

  render() {
    const { timeList } = this.props;

    return (
      <div className="LapTimeList">
        <div className="LapTimeList__listwrap">
          {timeList.length > 0 && (
            <div className="LapTimeList__headers">
              <span> Checkpoint </span> <span> Time </span>
            </div>
          )}

          <ul className="LapTimeList__list">
            {timeList.map((time, index) => {
              return (
                <li key={index}>
                  <LapTime lap={index + 1} time={time} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default LapTimeList;
