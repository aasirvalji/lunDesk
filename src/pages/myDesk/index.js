import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import ErrorModal from '../../components/ErrorModal/index';
import Snackbar from '../../components/Snackbar/index';
import { Stopwatch } from '../../components/Stopwatch';

// material UI imports
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import TimerIcon from '@material-ui/icons/Timer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

function MyDesk() {
  const [videoQueue, setVideoQueue] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [currentUrl, setCurrentUrl] = useState(
    'http://www.youtube.com/embed/kvO_nHnvPtQ?rel=0&hd=1'
  );
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(['', '']);
  const [snackbar, setSnackbar] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [stopWatch, setStopwatch] = useState(true);

  // tab change handler
  const handleTabChange = (e) => {
    if (document.visibilityState === 'visible') {
      console.log('tab is activate');
    } else {
      console.log('tab is inactive');
    }
  };

  // add tab change event listener
  useEffect(() => {
    document.addEventListener('visibilitychange', handleTabChange);
    return () => {
      // unsubscribe event
      document.removeEventListener('visibilitychange', handleTabChange);
    };
  }, [handleTabChange]);

  // validate youtube url and get id
  function getYTId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    console.log(url, match);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return 'Error:Invalid Url';
    }
  }

  // api call to fetch video information
  async function getVideoName(url, yid) {
    const res = await fetch(url, { method: 'GET' });
    res
      .json()
      .then((res) => {
        // Fetched response
        console.log(res);
        const videoDetails = {
          author_name: res.author_name,
          author_url: res.author_url,
          yid,
          title: res.title,
        };
        setVideoQueue((prevVideoQueue) => [videoDetails, ...prevVideoQueue]);
      })
      .catch((err) => console.log(err));
  }

  // url submission handler
  const onSubmit = async (event) => {
    event.preventDefault();
    var yid = getYTId(urlInput);
    console.log(yid);
    if (yid.split(':')[0] === 'Error') {
      setErrorModal(true);
      setErrorMessage([yid.split(':')[1], 'Please try again']);
    } else {
      await getVideoName(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${yid}`,
        yid
      );
    }
    // custom form handling here
  };

  // error modal handler
  function closeModal() {
    setErrorModal(false);
  }

  // snack bar handler
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  };

  function showControlPanel() {
    var y = document.getElementById('hide-control');
    y.style.display = 'none';

    var x = document.getElementById('show-control');
    x.style.display = 'block';
  }

  function hideControlPanel() {
    var x = document.getElementById('show-control');
    x.style.display = 'none';

    var y = document.getElementById('hide-control');
    y.style.display = 'block';
  }

  // set video in progress
  function selectVideo(url, index) {
    setCurrentUrl(url);

    if (selectedIndex !== null) {
      document.getElementById(`fab-${selectedIndex}`).style.backgroundColor =
        '#B20000';
    } else {
      videoQueue.forEach((video, index) => {
        document.getElementById(`fab-${index}`).style.backgroundColor =
          '#B20000';
      });
    }
    document.getElementById(`fab-${index}`).style.backgroundColor = '#2ECC40';

    setSelectedIndex(index);
  }

  // remove current video and set another video
  function removeVideo() {
    var tempQueue = videoQueue;
    for (var i = 0; i < videoQueue.length; i++) {
      if (i === selectedIndex) {
        tempQueue.splice(i, 1);
        setVideoQueue([...tempQueue]);
        break;
      }
    }
    setCurrentUrl('http://www.youtube.com/embed/kvO_nHnvPtQ?rel=0&hd=1');
    setSelectedIndex(null);
    setSnackbar(true);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.box1}>
          <div className={styles.videoWrapper}>
            <iframe
              // width="560"
              // height="349"
              src={currentUrl}
              frameBorder="0"
              allowFullScreen={true}
              title="Youtube"
            ></iframe>
          </div>
        </div>
        <div className={styles.box2}>
          <Paper elevation={10} className={styles.vidContainer}>
            <form onSubmit={onSubmit}>
              <Paper elevation={5} className={styles.root}>
                <IconButton
                  className={styles.iconButton}
                  aria-label="menu"
                  disabled
                >
                  <YouTubeIcon />
                </IconButton>
                <InputBase
                  className={styles.input}
                  placeholder="Enter Youtube Url"
                  onChange={(e) => setUrlInput(e.target.value)}
                />
                <IconButton type="submit" aria-label="search" disabled>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </form>
            <ul className={styles.urlList}>
              {videoQueue.length > 0 &&
                videoQueue.map((video, index) => (
                  <li className={styles.urlListItem} key={index}>
                    <Fab
                      aria-label="edit"
                      className={styles.fabButton}
                      id={`fab-${index}`}
                      onClick={() =>
                        selectVideo(
                          `http://www.youtube.com/embed/${video.yid}?rel=0&hd=1`,
                          index
                        )
                      }
                    >
                      <PlayArrowIcon
                        id={styles.editIcon}
                        className={styles.editIcon}
                      />
                    </Fab>
                    <p>{`${video.title} By ${video.author_name}`}</p>
                  </li>
                ))}
            </ul>
          </Paper>
          <Paper elevation={5} className={styles.doneContainer}>
            {videoQueue.length > 0 ? (
              <div className={styles.doneContent}>
                <Tooltip title="Remove video">
                  <IconButton aria-label="delete" onClick={() => removeVideo()}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <h2>Done watching this video?</h2>
              </div>
            ) : (
              <div className={styles.doneContent}>
                <IconButton aria-label="start" disabled>
                  <GolfCourseIcon />
                </IconButton>
                <h2>Add a couple of vidoes to get started!</h2>
              </div>
            )}
          </Paper>
        </div>
      </div>
      <div className={styles.box3}>
        <Paper
          elevation={5}
          className={styles.hiddenControls}
          id="hide-control"
          style={{ display: 'none' }}
        >
          {/* <Tooltip title="Show control panel"> */}
          <IconButton aria-label="delete" onClick={() => showControlPanel()}>
            <TimerIcon />
          </IconButton>
          {/* </Tooltip> */}
        </Paper>
        <Paper
          elevation={5}
          className={styles.controlsContainer}
          id="show-control"
        >
          <div className={styles.controlsHeader}>
            <>
              {/* <Tooltip title="Hide control panel"> */}
              <IconButton
                aria-label="delete"
                onClick={() => hideControlPanel()}
              >
                <TimerOffIcon />
              </IconButton>
              {/* </Tooltip> */}
              <h2>Control Panel</h2>
            </>
          </div>
          <div className={styles.controlOptions}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={stopWatch}
                  onChange={() => setStopwatch(!stopWatch)}
                  name="checkedA"
                />
              }
              className={styles.stopwatchControl}
              label="Enable stopwatch"
            />
          </div>
          {stopWatch && (
            <>
              <Paper elevation={5}>
                <div className={styles.stopwatchContainer}>
                  <TimerIcon className={styles.stopwatchIcon} />
                  <Stopwatch />
                </div>
              </Paper>
            </>
          )}
        </Paper>
      </div>
      {/* message display components */}
      <ErrorModal
        isOpen={errorModal}
        closeModal={closeModal}
        header={errorMessage[0]}
        body={errorMessage[1]}
      />

      <Snackbar
        isOpen={snackbar}
        message="Video completed"
        handleClose={handleClose}
      />
    </>
  );
}

export default MyDesk;
