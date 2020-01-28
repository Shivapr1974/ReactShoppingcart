import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
export default function MenuNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold'
  } 
  const hamStyle = {
    cursor: 'pointer',
  }
  const hamText = {
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold'
  }  
  return (
    <>
      <span style={hamStyle} onClick={handleClick}>
        {/* <div style={hamText}>MENU</div>     */}
        <div className="ham"></div>
        <div className="ham"></div>
        <div className="ham"></div>    
      </span>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="menu"
      >

        <MenuItem onClick={handleClose}>
          <div> <CloseIcon color="action"></CloseIcon></div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link style={navStyle} to='/shop'>
                Shop
            </Link>          
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link style={navStyle} to='/cart'>
                Cart
            </Link>          
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link style={navStyle} to='/feedback'>
                Feedback
            </Link>          
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link style={navStyle} to='/about'>
                About
            </Link>          
        </MenuItem>
      </Menu>
    </>
  );
}