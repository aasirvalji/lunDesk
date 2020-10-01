import React, { useState } from 'react';
import styles from './index.module.css';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function MyDesk() {
  const [videoQueue, setVideoQueue] = useState([]);
  const [urlInput, setUrlInput] = useState('lol');

  function getYTId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      // show error popup here
    }
  }

  function getVideoName() {
    fetch(
      'https://noembed.com/embed?url=https://www.youtube.com/watch?v=x22TJMv2RYo'
    )
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data.title));
  }

  const classes = useStyles();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.box1}>
          <div className={styles.videoWrapper}>
            {getVideoName()}
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
          <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
              <YouTubeIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search Google Maps"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Paper>
      </div>
    </>
  );
}

export default MyDesk;
