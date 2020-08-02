import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SigninComp from './components/SigninComp';
import SignupComp from './components/SignupComp';
import './Signin.less';
import img from '../../../static/signin.png';

export default function Signin(props) {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Grid container spacing={1} style={{ margin: '50px 0', width: '100%' }}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Paper
            square
            elevation={1}
            style={{ height: '580px', display: 'flex' }}
          >
            <div className="signin-container">
              <Route path="/signin" component={SigninComp} />
              <Route path="/signup" component={SignupComp} />
            </div>
            <div className="signin-image-container">
              <img className="signin-image" alt="sign-img" src={img} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </div>
  );
}
