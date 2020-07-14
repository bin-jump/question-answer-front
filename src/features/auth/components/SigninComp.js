import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function SigninComp(props) {
  return (
    <div>
      <Grid container spacing={1} style={{ margin: '80px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>
            Welcome back,
          </Typography>
          <Typography
            variant="overline"
            gutterBottom
            style={{ color: '#ababab' }}
          >
            Sign in with your account
          </Typography>
          <TextField id="standard-basic" label="name" />
          <TextField id="standard-basic" label="password" />
          <Button
            variant="contained"
            style={{
              margin: 'auto',
              marginTop: '50px',
              width: '100px',
              background: '#f44336',
              color: 'white',
            }}
          >
            SignIn
          </Button>
          <Link
            to="/signup"
            style={{
              margin: 'auto',
              marginTop: '140px',
              color: 'grey',
            }}
          >
            Sign Up
          </Link>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </div>
  );
}
