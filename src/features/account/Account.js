import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Route, Link, Redirect } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Information from './components/Information';
import Private from './components/Private';
import { milisecToDate, extractUrlKey } from '../common/helper';
import './Account.less';

export default function Account(props) {
  const user = useSelector((state) => state.auth.user);
  const userAlreadyPin = useSelector((state) => state.auth.userAlreadyPin);
  const location = useLocation();

  const urlKey = extractUrlKey(location.pathname);
  //console.log(urlKey);

  if (userAlreadyPin && user === null) {
    return <Redirect to="/signin" />;
  }

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
                    <div style={{ width: '100%' }}>
                      <Typography
                        style={{
                          color: '#39434b',
                          fontWeight: 'bold',
                          fontSize: 20,
                        }}
                      >
                        {user.name}
                      </Typography>
                      <div style={{ color: 'grey' }}>{`since ${milisecToDate(
                        user.created,
                      )}`}</div>
                    </div>

                    <div style={{ width: 240 }} />
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
                <div className="feature-account-content">
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
              <div style={{ padding: 50 }}>
                <div style={{ display: 'flex' }}>
                  <Skeleton variant="rect" height={90} width={90} />
                  <div>
                    <Skeleton
                      style={{ margin: '20px 0 0 25px' }}
                      variant="text"
                      height={40}
                      width={100}
                    />
                    <Skeleton
                      style={{ margin: '0 0 0 25px' }}
                      variant="text"
                      height={35}
                      width={120}
                    />
                  </div>
                </div>

                <div style={{ paddingLeft: 50, paddingTop: 70 }}>
                  <Skeleton variant="text" height={50} width={500} />
                  <Skeleton variant="text" height={50} width={500} />
                  <Skeleton variant="text" height={50} width={500} />
                </div>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
