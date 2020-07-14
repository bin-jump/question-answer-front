import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function SignupComp(props) {
  return (
    <div>
      <Grid container spacing={1} style={{ margin: '30px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>
            Get your free account now.
          </Typography>
          <Typography
            variant="overline"
            gutterBottom
            style={{ color: '#ababab' }}
          >
            Take part in discussion after signin
          </Typography>
          <TextField label="name" />
          <TextField label="email" />
          <TextField label="password" />
          <TextField label="password comfirm" />
          <Button
            variant="contained"
            style={{
              margin: 'auto',
              marginTop: '30px',
              width: '100px',
              background: '#f44336',
              color: 'white',
            }}
          >
            SignUp
          </Button>
          <Link
            to="/signin"
            style={{
              margin: 'auto',
              marginTop: '80px',
              color: 'grey',
            }}
          >
            Sign In
          </Link>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </div>
  );
}
