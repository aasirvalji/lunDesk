import React, { useState } from 'react';
import styles from './index.module.css';
import Paper from '@material-ui/core/Paper';

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
          <input type="text" name="name" value={urlInput} />
        </Paper>
      </div>
    </>
  );
}

export default MyDesk;
