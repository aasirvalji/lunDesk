import React from 'react';
import './index.css';
import InfoIcon from '@material-ui/icons/Info';

function UnsupportedDevice() {
  return (
    <div className="unsupportedDeviceContainer">
      <InfoIcon style={{ color: '#B20000' }} />
      <h2>Unsupported device</h2>
      <p>Please try again on another device</p>
    </div>
  );
}

export default UnsupportedDevice;
