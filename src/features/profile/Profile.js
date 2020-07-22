import React, { useEffect } from 'react';
import { useParams, Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Head from './components/Head';

export default function Profile(props) {
  const { id } = useParams();
  return (
    <div>
      <Head id={id} />
      <Grid container spacing={1} style={{ margin: '50px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={7}>
          Profile
        </Grid>
      </Grid>
    </div>
  );
}
