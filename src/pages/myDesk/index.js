import React from 'react';
import styles from './index.module.css';

function MyDesk() {
  function getYTId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      // show error popup here
    }
  }

  return (
    <>
      <div class={styles.wrapper}>
        <div className={styles.box1}>
          <div class={styles.videoWrapper}>
            <iframe
              width="560"
              height="349"
              src="http://www.youtube.com/embed/x22TJMv2RYo?rel=0&hd=1"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        ksdjksjksd
      </div>
    </>
  );
}

export default MyDesk;
