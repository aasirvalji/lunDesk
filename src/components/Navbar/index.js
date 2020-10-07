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
            <Typography variant="h6" id="lunDesk">
              lunDesk
            </Typography>
          </div>

          <div id="header-right">
            <>
              <Typography variant="h6" id="stayProd">
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
