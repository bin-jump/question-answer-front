import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { PendButton } from '../../common';
import { useAddUser } from '../redux/hooks';

export default function SignupComp(props) {
  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: '',
    cmfPassword: '',
    showPassword: false,
    cmfPasswordError: '',
  });

  const { addUser, user, signupPending } = useAddUser();

  const onSignup = () => {
    if (
      !values.userName ||
      !values.email ||
      !values.password ||
      values.cmfPasswordError
    ) {
      return;
    }
    addUser(values.userName, values.password, values.email);
  };

  const missMatchMessage = 'password not match';
  const onPasswordInput = (e) => {
    let err = values.cmfPassword === e.target.value ? '' : missMatchMessage;
    setValues({
      ...values,
      password: e.target.value,
      cmfPasswordError: err,
    });
  };

  const onCmfPasswordInput = (e) => {
    let err = values.password === e.target.value ? '' : missMatchMessage;
    setValues({
      ...values,
      cmfPassword: e.target.value,
      cmfPasswordError: err,
    });
  };

  return (
    <div>
      <Grid container spacing={1} style={{ margin: '30px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>
            {`Get your free 
            account now.`}
          </Typography>
          <Typography
            variant="overline"
            gutterBottom
            style={{ color: '#ababab' }}
          >
            Take part in discussion after signin
          </Typography>
          <TextField
            label="name"
            value={values.userName}
            onChange={(e) => setValues({ ...values, userName: e.target.value })}
          />
          <TextField
            label="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />

          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              password
            </InputLabel>
            <Input
              value={values.password}
              onChange={(e) => onPasswordInput(e)}
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) =>
                      setValues({
                        ...values,
                        showPassword: !values.showPassword,
                      })
                    }
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              password confirm
            </InputLabel>
            <Input
              value={values.cmfPassword}
              onChange={(e) => onCmfPasswordInput(e)}
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) =>
                      setValues({
                        ...values,
                        showPassword: !values.showPassword,
                      })
                    }
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div style={{ color: 'red', margin: 5 }}>
            {values.cmfPasswordError}
          </div>
          <PendButton
            variant="contained"
            style={{
              margin: 'auto',
              marginTop: '30px',
              width: '100px',
              background: '#f44336',
              color: 'white',
            }}
            pending={signupPending}
            onClick={onSignup}
          >
            SignUp
          </PendButton>
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
