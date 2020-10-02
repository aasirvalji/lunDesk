//general imports
import React from 'react';
import './index.css';

//material UI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => {
  return (
    <>
      <AppBar position="static" id="nav">
        <Toolbar id="toolbar">
          <div id="header-left">
            <Typography variant="h6" id="miSquads">
              myDesk
            </Typography>
          </div>

          {/* render links based on authentication status*/}
          <div id="header-right">
            <>
              {/* <Typography variant="h6" id="about">
                About
              </Typography> */}
              {/* currently testing dashboard route on frontend */}
              <Typography variant="h6" id="login">
                Stay productive
              </Typography>
            </>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
