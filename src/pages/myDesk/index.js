import React, { useState, useEffect, useRef } from 'react';
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
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Tooltip from '@material-ui/core/Tooltip';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import GridOnIcon from '@material-ui/icons/GridOn';
import GridOffIcon from '@material-ui/icons/GridOff';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import TimerIcon from '@material-ui/icons/Timer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import DvrIcon from '@material-ui/icons/Dvr';

function MyDesk() {
  // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  const childRef = useRef();

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
  const [watchMode, setWatchMode] = useState(true);

  const defaultUrl = 'http://www.youtube.com/embed/kvO_nHnvPtQ?rel=0&hd=1';

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

  function test() {
    childRef.current.getAlert();
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
                <IconButton type="submit" aria-label="search">
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
                      <PlayArrowIcon className={styles.editIcon} />
                    </Fab>
                    <p>{`${video.title} By ${video.author_name}`}</p>
                  </li>
                ))}
            </ul>
          </Paper>
          <Paper elevation={5} className={styles.doneContainer}>
            {videoQueue.length > 0 && currentUrl === defaultUrl ? (
              <div className={styles.doneContent}>
                <IconButton aria-label="delete" disabled>
                  <TouchAppIcon />
                </IconButton>
                <h2>Select a video to get started!</h2>
              </div>
            ) : videoQueue.length > 0 && currentUrl !== defaultUrl ? (
              <div className={styles.doneContent}>
                <Tooltip title="Remove video">
                  <IconButton aria-label="delete" onClick={() => removeVideo()}>
                    <DoneOutlineIcon />
                  </IconButton>
                </Tooltip>
                <h2>Done watching?</h2>
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
        >
          {/* <Tooltip title="Show control panel"> */}
          <IconButton aria-label="delete" onClick={() => showControlPanel()}>
            <GridOnIcon />
          </IconButton>
          {/* </Tooltip> */}
        </Paper>
        <Paper
          elevation={5}
          className={styles.controlsContainer}
          id="show-control"
          style={{ display: 'none' }}
        >
          <div className={styles.controlsHeader}>
            <>
              {/* <Tooltip title="Hide control panel"> */}
              <IconButton
                aria-label="delete"
                onClick={() => hideControlPanel()}
                className={styles.gridOffButton}
              >
                <GridOffIcon />
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
              label="Enable watch mode"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={watchMode}
                  onChange={() => setWatchMode(!watchMode)}
                  name="checkedA"
                />
              }
              className={styles.stopwatchControl}
              label="Enable stopwatch"
            />
          </div>
          {watchMode && (
            <Paper elevation={5}>
              <div className={styles.watchModeContainer}>
                <DvrIcon className={styles.stopwatchIcon} />
                <p>Watch mode allows you to do xyz</p>
                <div className={styles.watchMode}>
                  <Stopwatch className={styles.watchMode} ref={childRef} />
                </div>
                <button onClick={() => test()}>Click</button>
              </div>
            </Paper>
          )}
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
