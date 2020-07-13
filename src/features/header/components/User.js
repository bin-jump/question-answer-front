import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './User.less';

export default function User() {
  return (
    <div>
      <Button
        variant="outlined"
        style={{ border: '1px solid rgb(255, 255, 255)', color: 'white' }}
        component={Link}
        to="/login"
      >
        Signin
      </Button>
    </div>
  );
}
