import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './User.less';

class User extends Component {
  render() {
    return (
      <div>
        <Button
          variant="outlined"
          style={{ border: '1px solid rgb(255, 255, 255)', color: 'white' }}
        >
          Signin
        </Button>
      </div>
    );
  }
}

export default User;
