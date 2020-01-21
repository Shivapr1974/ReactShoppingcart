import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
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
    textDecoration: 'none'
  }
  const hamStyle = {
    cursor: 'pointer'
  }
  return (
    <>
      <span style={hamStyle} onClick={handleClick}>
        <div class="ham"></div>
        <div class="ham"></div>
        <div class="ham"></div>    
      </span>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
            <Link style={navStyle} to='/shop'>
                <li>Home</li>
            </Link>          
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link style={navStyle} to='/cart'>
                <li>Cart</li>
            </Link>          
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link style={navStyle} to='/about'>
                <li>About</li>
            </Link>          
        </MenuItem>
      </Menu>
    </>
  );
}