import React, { useState, useEffect, useRef } from 'react';
import { PendButton } from '../../common';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useEditUser } from '../redux/hooks';
import { usePinUser } from '../../auth/redux/hooks';
import './content.less';

export default function Information(props) {
  const { user: curUser } = { ...props };
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const prevupdatePendingRef = useRef();

  const { editUser, updatePending } = useEditUser();
  const { pinUser } = usePinUser();

  const update = () => {
    if (user == null) {
      return;
    }
    let data = {
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      description: user.description,
    };
    editUser(user.id, data);
  };

  useEffect(() => {
    prevupdatePendingRef.current = updatePending;
  }, [updatePending]);
  const prevsignoutPending = prevupdatePendingRef.current;

  // update user info after update
  useEffect(() => {
    if (prevsignoutPending && !updatePending) {
      pinUser();
    }
  }, [pinUser, prevsignoutPending, updatePending]);

  useEffect(() => {
    setUser(curUser);
  }, [curUser]);

  return (
    <div>
      {user ? (
        <div>
          <div className="feature-account-content-item">
            <div className="feature-account-content-item-name">Email: </div>
            <TextField
              disabled={!edit}
              value={user.email}
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="feature-account-content-item">
            <div className="feature-account-content-item-name">Age: </div>
            <TextField
              disabled={!edit}
              value={user.age}
              type="number"
              style={{ width: 80 }}
              InputProps={{ inputProps: { min: 0, max: 200 } }}
              onChange={(e) => setUser({ ...user, age: e.target.value })}
            />
            <div
              className="feature-account-content-item-name"
              style={{ width: 50 }}
            >
              Gender:{' '}
            </div>
            <Select
              displayEmpty
              defaultValue={user.gender}
              disabled={!edit}
              value={user.gender}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            >
              <MenuItem value={''}>--</MenuItem>
              <MenuItem value={'MALE'}>Male</MenuItem>
              <MenuItem value={'FEMALE'}>Female</MenuItem>
            </Select>
          </div>
          <div className="feature-account-content-item">
            <div className="feature-account-content-item-name">
              Description:{' '}
            </div>
            <TextField
              onChange={(e) =>
                setUser({ ...user, description: e.target.value })
              }
              value={user.description}
              disabled={!edit}
            />
          </div>
          {edit ? (
            <PendButton
              style={{ float: 'right', color: 'white' }}
              onClick={update}
              pending={updatePending}
            >
              Save
            </PendButton>
          ) : (
            <div
              className="feature-account-edit-click"
              onClick={() => setEdit(true)}
            >
              Edit
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
