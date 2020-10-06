import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Controls.css';
import Button from '@material-ui/core/Button';

class Controls extends Component {
  static proptTypes = {
    isRunning: PropTypes.bool,
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    addLapTime: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isRunning: false,
  };

  render() {
    const { isRunning, start, stop, reset, addLapTime } = this.props;

    return (
      <div className="Controls">
        {!isRunning ? (
          <Button
            onClick={start}
            className="controlsButton"
            ref="startBtn"
            variant="contained"
            color="secondary"
          >
            {' '}
            Start{' '}
          </Button>
        ) : null}

        {isRunning ? (
          <Button
            onClick={stop}
            className="controlsButton"
            ref="stopBtn"
            variant="contained"
            color="secondary"
          >
            {' '}
            Stop{' '}
          </Button>
        ) : null}

        <Button
          onClick={reset}
          disabled={isRunning}
          className="controlsButton"
          ref="resetBtn"
          variant="contained"
          color="secondary"
        >
          {' '}
          Reset{' '}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={addLapTime}
          disabled={!isRunning}
          className="controlsButton"
          ref="lapBtn"
        >
          {' '}
          Create Checkpoint{' '}
        </Button>
      </div>
    );
  }
}

export default Controls;
