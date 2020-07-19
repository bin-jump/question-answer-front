import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { ContentEditor, PendButton } from '../../common';

export default function WriteAnswer(props) {
  const { questionId, user } = { ...props };
  const location = useLocation();
  const focus = location.hash === '#write';

  return (
    <div id="write" className="feature-question-write">
      {user ? (
        <Paper square style={{ minHeight: 180, padding: '20px 20px' }}>
          <Typography variant="h6" style={{ display: 'flex' }}>
            Write your answer
            <Avatar
              alt="User"
              src={user.avatarUrl}
              style={{ height: 25, width: 25, marginLeft: 10 }}
            />
          </Typography>
          <hr />
          <ContentEditor autoFocus={focus} />
          <div>
            {/* <Button
              variant="contained"
              color="primary"
              style={{ color: 'white' }}
            >
              Post Answer
            </Button> */}
            <PendButton style={{ color: 'white' }}>Post Answer</PendButton>
          </div>
        </Paper>
      ) : null}
    </div>
  );
}
