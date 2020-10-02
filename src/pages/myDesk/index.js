import React, { useState } from 'react';
import styles from './index.module.css';
import ErrorModal from '../../components/ErrorModal';

// material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function MyDesk() {
  const [videoQueue, setVideoQueue] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(['', '']);

  function getYTId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    console.log(url, match);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return 'Error:Invalid Url';
    }
  }

  function closeModal() {
    setErrorModal(false);
  }

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
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.box1}>
          <div className={styles.videoWrapper}>
            <iframe
              width="560"
              height="349"
              src={currentUrl}
              frameBorder="0"
              allowFullScreen={true}
              title="Youtube"
            ></iframe>
          </div>
        </div>
        <Paper elevation={10} className={styles.box2}>
          <form onSubmit={onSubmit}>
            <Paper elevation={5} className={styles.root}>
              <IconButton className={styles.iconButton} aria-label="menu">
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
            {videoQueue.length > 0 ? (
              videoQueue.map((video, index) => (
                <li className={styles.urlListItem} key={index}>
                  <Fab
                    color="secondary"
                    aria-label="edit"
                    className={styles.fabButton}
                    onClick={() =>
                      setCurrentUrl(
                        `http://www.youtube.com/embed/${video.yid}?rel=0&hd=1`
                      )
                    }
                  >
                    <PlayArrowIcon className={styles.editIcon} />
                  </Fab>
                  <p>{`${video.title} By ${video.author_name}`}</p>
                </li>
              ))
            ) : (
              <p>no videos</p>
            )}
          </ul>
        </Paper>
      </div>

      <ErrorModal
        isOpen={errorModal}
        closeModal={closeModal}
        header={errorMessage[0]}
        body={errorMessage[1]}
      />
    </>
  );
}

export default MyDesk;
