import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import RateReviewIcon from '@material-ui/icons/RateReview';
import RssFeedIcon from '@material-ui/icons/RssFeed';

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
              marginTop: 6,
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <Link
            style={{
              color: '#39434b',
              fontWeight: 'bold',
              fontSize: 20,
              textDecoration: 'none',
            }}
            to={`/profile/${user.id}`}
          >
            {user.name}
          </Link>

          <Typography style={{ color: '#87a1aa' }}>
            {user.description}
          </Typography>

          <div
            style={{ marginLeft: -3, marginTop: 8 }}
            className="common-answer-info-container"
          >
            <div className="common-answer-info">
              <RateReviewIcon />
              <div className="common-answer-info-word">{user.answerCount}</div>
              <div className="common-answer-info-word">Answers</div>
            </div>

            <div className="common-answer-info">
              <RssFeedIcon />
              <div className="common-answer-info-word">
                {user.followerCount}
              </div>
              <div className="common-answer-info-word">Follows</div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
