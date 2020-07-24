import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link, useLocation } from 'react-router-dom';
import { extractUrlKey } from '../../common/helper';
import './Head.less';

export default function Head(props) {
  const { id } = { ...props };
  const location = useLocation();

  const keys = ['question', 'answer', 'follow', 'followee', 'follower'];

  const curKey = extractUrlKey(location.pathname);

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
