import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSignout } from '../../auth/redux/hooks';
import { Pendable, Loading } from '../../common';
import './User.less';

export default function User(props) {
  const { user } = { ...props };
  const [anchorEl, setAnchorEl] = useState(null);
  let history = useHistory();
  const prevsignoutPendingRef = useRef();

  const { signout, signoutPending } = useSignout();

  useEffect(() => {
    prevsignoutPendingRef.current = signoutPending;
  }, [signoutPending]);
  const prevsignoutPending = prevsignoutPendingRef.current;

  useEffect(() => {
    if (prevsignoutPending && !signoutPending) {
      // goto signin after signout
      history.push('/signin');
    }
  }, [signoutPending, prevsignoutPending, history]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    signout();
    handleClose();
  };

  return (
    <div>
      <Pendable
        pending={signoutPending}
        pendContent={<Loading style={{ color: 'white' }} />}
      >
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
              <MenuItem
                component={Link}
                to={`/profile/${user.id}/question`}
                onClick={handleClose}
              >
                Profile
              </MenuItem>
              <MenuItem component={Link} to={`/account`} onClick={handleClose}>
                Account
              </MenuItem>
              <MenuItem component={Link} to={`/message`} onClick={handleClose}>
                Message
              </MenuItem>
              <MenuItem component={Link} to={`/`} onClick={handleSignout}>
                Signout
              </MenuItem>
            </Menu>
            <Avatar
              alt={`${user.name}`}
              src={user.avatarUrl}
              variant="rounded"
              style={{ border: '1px solid white', cursor: 'pointer' }}
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
      </Pendable>
    </div>
  );
}
