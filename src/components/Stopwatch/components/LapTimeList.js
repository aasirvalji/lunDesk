import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LapTimeList.css';
import LapTime from './LapTime';

// material ui imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>

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
