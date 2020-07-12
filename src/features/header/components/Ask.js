import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './Ask.less';

class Ask extends Component {
  render() {
    return (
      <div>
        <Button
          variant="contained"
          style={{
            background: 'white',
            color: '#779ea6',
            width: '130px',
            fontSize: '12px',
          }}
        >
          Ask Question
        </Button>
      </div>
    );
  }
}

export default Ask;
