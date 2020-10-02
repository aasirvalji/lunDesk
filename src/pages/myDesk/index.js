import React, { useState } from 'react';
import styles from './index.module.css';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { FlashOff } from '@material-ui/icons';

function MyDesk() {
  const [videoQueue, setVideoQueue] = useState([]);
  const [urlInput, setUrlInput] = useState('');

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

  async function getVideoName(url) {
    const res = await fetch(url, { method: 'GET' });
    res
      .json()
      .then((res) => {
        // Fetched response
        console.log(res);
        setVideoQueue((prevVideoQueue) => [res, ...prevVideoQueue]);
      })
      .catch((err) => console.log(err));
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    var yid = getYTId(urlInput);
    console.log(yid);
    if (yid.split(':')[0] === 'Error') console.log(yid.split(':')[1]);
    else {
      var newVideo;

      await getVideoName(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${yid}`
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
              src="http://www.youtube.com/embed/x22TJMv2RYo?rel=0&hd=1"
              frameBorder="0"
              allowFullScreen={true}
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
              videoQueue.map((video) => (
                <li className={styles.urlListItem}>
                  <Fab
                    color="secondary"
                    aria-label="edit"
                    className={styles.fabButton}
                  >
                    <PlayArrowIcon className={styles.editIcon} />
                  </Fab>
                  <p>{`${video.title} and ${video.author_name}`}</p>
                </li>
              ))
            ) : (
              <p>no videos</p>
            )}
          </ul>
        </Paper>
      </div>
    </>
  );
}

export default MyDesk;
