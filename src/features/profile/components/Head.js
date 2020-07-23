import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link, useLocation } from 'react-router-dom';
import './Head.less';

export default function Head(props) {
  const { id } = { ...props };
  const location = useLocation();

  const keys = ['question', 'answer', 'follow', 'followee', 'follower'];

  const extractKey = () => {
    let path = location.pathname;
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    let key = path.split('/').slice(-1)[0];
    return key;
  };

  const curKey = extractKey();

  return (
    <div className="feature-profile-head">
      <Grid container spacing={1} style={{ height: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={7} style={{ display: 'contents', padding: 0 }}>
          {keys.map((item, i) => {
            return (
              <div
                className={`profile-head-selection ${
                  curKey === item ? 'profile-head-selection-selected' : ''
                }`}
              >
                <Link to={`/profile/${id}/${item}`}>{item}</Link>
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
