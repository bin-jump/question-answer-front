import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Route, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Information from './components/Information';
import Private from './components/Private';
import { extractUrlKey } from '../common/helper';
import './Account.less';

export default function Account(props) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  const urlKey = extractUrlKey(location.pathname);
  //console.log(urlKey);

  return (
    <div>
      <Grid container spacing={1} style={{ margin: '40px 0', width: '100%' }}>
        <Grid item xs={2} />

        <Grid item xs={8}>
          <Paper square style={{ height: 500 }}>
            {/* <div className="feature-account-banner"></div> */}
            {user ? (
              <div className="feature-account-container">
                <div className="feature-account-info">
                  <Avatar
                    alt={user.name}
                    src={user.avatarUrl}
                    variant="rounded"
                    style={{
                      border: '1px solid #dce3e8',
                      width: 90,
                      height: 90,
                      marginRight: 16,
                    }}
                  />
                  <div style={{ marginTop: 50, display: 'flex' }}>
                    <Typography
                      style={{
                        color: '#39434b',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                    >
                      {user.name}
                    </Typography>
                    <div style={{ width: 300 }} />
                    <div
                      className={`feature-account-tab-name ${
                        urlKey === 'account'
                          ? 'feature-account-tab-selected'
                          : ''
                      }`}
                    >
                      <Link to={'/account'}>Infomation</Link>
                    </div>
                    <div
                      className={`feature-account-tab-name ${
                        urlKey === 'private'
                          ? 'feature-account-tab-selected'
                          : ''
                      }`}
                    >
                      <Link to={'/account/private'}>Private</Link>
                    </div>
                  </div>
                </div>
                <hr style={{ marginTop: 0 }} />
                <div>
                  <Route
                    path={`/account`}
                    exact
                    render={(props) => <Information user={user} />}
                  />
                  <Route
                    path={`/account/private`}
                    exact
                    render={(props) => <Private user={user} />}
                  />
                </div>
              </div>
            ) : (
              <Button>Signin</Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
