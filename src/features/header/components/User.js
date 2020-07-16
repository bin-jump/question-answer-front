import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './User.less';

export default function User(props) {
  const user = props.user;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            style={{}}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to={`/user`} onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem component={Link} to={`/message`} onClick={handleClose}>
              Message
            </MenuItem>
            <MenuItem component={Link} to={`/logout`} onClick={handleClose}>
              Logout
            </MenuItem>
          </Menu>
          <Avatar
            alt="User photo"
            src={user.avatarUrl}
            variant="rounded"
            style={{ border: '1px solid white' }}
            onClick={handleClick}
          />
        </div>
      ) : (
        <Button
          variant="outlined"
          style={{ border: '1px solid rgb(255, 255, 255)', color: 'white' }}
          component={Link}
          to="/signin"
        >
          Signin
        </Button>
      )}
    </div>
  );
}
