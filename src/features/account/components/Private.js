import React, { useState } from 'react';
import { PendButton } from '../../common';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useEditUser } from '../redux/hooks';
import './content.less';

export default function Private(props) {
  const { user } = { ...props };

  const { changePassword, updatePending } = useEditUser();

  const [values, setValues] = useState({
    password: '',
    newPassword: '',
    cmfNewPassword: '',
    showPassword: false,
    cmfPasswordError: '',
  });

  const updatePassword = () => {
    if (!values.password || values.cmfPasswordError) {
      return;
    }
    changePassword(user.id, values.password, values.newPassword);
  };

  const missMatchMessage = 'not match';
  const onNewPasswordInput = (e) => {
    let err = values.cmfNewPassword === e.target.value ? '' : missMatchMessage;
    setValues({
      ...values,
      newPassword: e.target.value,
      cmfPasswordError: err,
    });
  };

  const onCmfPasswordInput = (e) => {
    let err = values.newPassword === e.target.value ? '' : missMatchMessage;
    setValues({
      ...values,
      cmfNewPassword: e.target.value,
      cmfPasswordError: err,
    });
  };

  return (
    <div>
      <div className="feature-account-content-item">
        <div className="feature-account-password-item-name">
          Current Password:
        </div>
        <Input
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          type={values.showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={(e) =>
                  setValues({ ...values, showPassword: !values.showPassword })
                }
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <div className="feature-account-content-item">
        <div className="feature-account-password-item-name">New Password: </div>
        <Input
          value={values.newPassword}
          onChange={(e) => onNewPasswordInput(e)}
          type={values.showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={(e) =>
                  setValues({ ...values, showPassword: !values.showPassword })
                }
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <div className="feature-account-content-item">
        <div className="feature-account-password-item-name">
          Confirm New Password:
        </div>
        <Input
          value={values.cmfNewPassword}
          onChange={(e) =>
            //setValues({ ...values, cmfNewPassword: e.target.value })
            onCmfPasswordInput(e)
          }
          type={values.showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={(e) =>
                  setValues({ ...values, showPassword: !values.showPassword })
                }
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <div style={{ color: 'red', margin: 5 }}>{values.cmfPasswordError}</div>
      </div>
      <PendButton
        onClick={updatePassword}
        pending={updatePending}
        style={{ float: 'right', color: 'white' }}
      >
        Change Password
      </PendButton>
    </div>
  );
}
