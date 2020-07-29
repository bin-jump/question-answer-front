import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

export default function User(props) {
  const { user, elevation } = { ...props };

  return (
    <Paper
      square
      elevation={elevation}
      style={{ padding: 10, width: 600, marginBottom: 10 }}
    >
      <Grid container spacing={1} style={{ margin: '10px 0', width: '100%' }}>
        <Grid item xs={2}>
          <Avatar
            alt={user.name}
            src={user.avatarUrl}
            style={{
              margin: 'auto',
              border: '1px solid #dce3e8',
              width: 60,
              height: 60,
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography>{user.name}</Typography>
          <Typography style={{ color: 'grey' }}>{user.description}</Typography>
          <Typography
            style={{ color: '#7f8d99' }}
          >{`${user.answerCount} Answer  ${user.followerCount} Answer`}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
