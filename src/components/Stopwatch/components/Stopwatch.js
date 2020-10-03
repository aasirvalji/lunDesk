import React, { Component } from 'react';
import './Stopwatch.css';

import Timer from './Timer';
import Controls from './Controls';
import LapTimeList from './LapTimeList';
import Config from '../constants/Config';

// material ui imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function getDefaultState() {
  return {
    isRunning: false,
    time: 0,
    timeList: [],
    errorModalOpen: false,
  };
}

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState();
    this.timerRef = null;
  }

  updateTimer(extraTime) {
    const { time } = this.state;
    this.setState({ time: time + extraTime });
  }

  start() {
    this.setState(
      {
        isRunning: true,
      },
      () => {
        this.timerRef = setInterval(() => {
          this.updateTimer(Config.updateInterval);
        }, Config.updateInterval);
      }
    );
  }

  stop() {
    this.setState(
      {
        isRunning: false,
      },
      () => {
        clearInterval(this.timerRef);
      }
    );
  }

  reset() {
    this.setState(getDefaultState());
  }

  addLapTime() {
    const { time, timeList } = this.state;

    if (timeList.length >= 1000) {
      this.setState({
        errorModalOpen: true,
      });

      var tempList = timeList;
      tempList.shift();
      tempList.push(time);
      this.setState({
        timeList: tempList,
      });
    } else {
      this.setState({
        timeList: [...timeList, time],
      });
    }
  }

  /* misc functions */
  closeModal() {
    this.setState({
      errorModalOpen: false,
    });
  }

  render() {
    const { isRunning, time, timeList } = this.state;

    return (
      <div className="Stopwatch">
        {/* <h1>Simple Stopwatch App</h1> */}

        <Timer time={time} />

        <Controls
          isRunning={isRunning}
          start={() => this.start()}
          stop={() => this.stop()}
          reset={() => this.reset()}
          addLapTime={() => this.addLapTime()}
        />

        <LapTimeList timeList={timeList} />

        <Dialog
          open={this.state.errorModalOpen}
          onClose={() => this.closeModal()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Checkpoint Warning</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The checkpoint limit is 1000. Your oldest checkpoints will be
              replaced until a new session is started.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.closeModal()} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Stopwatch;
