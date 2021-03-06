import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import NavBar from './components/NavBar';
import Ask from './components/Ask';
import Search from './components/Search';
import User from './components/User';
import './Header.less';

export default function Header(props) {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="header">
      <div className="header-container">
        <Grid container spacing={1}>
          <Grid item xs={1} />
          <Grid item xs={1}>
            <div className="header-logo">LOGO</div>
          </Grid>
          <Grid item xs={2}>
            <NavBar pathname={location.pathname} user={user} />
          </Grid>
          <Grid item xs={1}>
            <Ask user={user} />
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={1}>
            <Search />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={1}>
            <User user={user} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
