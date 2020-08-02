import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { PendButton } from '../../common';
import { useSignin } from '../redux/hooks';

export default function SigninComp(props) {
  const [values, setValues] = useState({
    userName: '',
    password: '',
    remeberMe: false,
    showPassword: false,
  });

  const { signin, user, signinPending } = useSignin();

  const onSignin = () => {
    if (!values.userName || !values.password) {
      return;
    }
    signin(values.userName, values.password, values.remeberMe);
  };

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
          <TextField
            value={values.userName}
            onChange={(e) =>
              setValues({
                ...values,
                userName: e.target.value,
              })
            }
            label="name"
          />

          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              password
            </InputLabel>
            <Input
              value={values.password}
              onChange={(e) =>
                setValues({
                  ...values,
                  password: e.target.value,
                })
              }
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

          <FormControlLabel
            style={{ margin: 'auto', marginTop: 30 }}
            control={
              <Checkbox
                checked={values.remeberMe}
                onChange={(e) =>
                  setValues({
                    ...values,
                    remeberMe: !values.remeberMe,
                  })
                }
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Remeber Me"
          />

          <PendButton
            variant="contained"
            style={{
              margin: 'auto',
              marginTop: '50px',
              width: 90,
              background: '#f44336',
              color: 'white',
            }}
            pending={signinPending}
            onClick={onSignin}
          >
            SignIn
          </PendButton>
          <Link
            to="/signup"
            style={{
              margin: 'auto',
              marginTop: 90,
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
