import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { milisecToDate } from '../../common/helper';
import Button from '@material-ui/core/Button';
import './Comments.less';

function Comment(idx, cmt, size, user) {
  const hideBar = idx + 1 === size && user == null;

  return (
    <div className="feature-comments-talk-container">
      <div className="feature-comments-talk-body">
        <Divider
          orientation="vertical"
          flexItem
          style={{
            marginRight: -18,
            marginBottom: -20,
            padding: 2,
            height: hideBar ? 'fit-content' : 'auto',
          }}
        />
        <Avatar
          alt="user"
          src={cmt.author.avatarUrl}
          style={{ width: 30, height: 30 }}
        />
        <div className="talk-bubble tri-right left-in">
          <div className="talk-bubble-info">
            <Link>{`${cmt.author.name} `}</Link>
            {`${milisecToDate(cmt.created)}`}
          </div>
          <div className="talk-bubble-content">{cmt.body}</div>
        </div>
      </div>
    </div>
  );
}

export default function Comments(props) {
  const { comments, user, commentCount } = { ...props };
  // in case if new comment added while comment counter not updated...
  const commentCnt =
    comments.length > commentCount ? comments.length : commentCount;

  return (
    <div className="feature-comments">
      <div className="feature-comments-title">{`${commentCnt} Comment`}</div>
      <hr />
      {comments.map((item, i) => Comment(i, item, comments.length, user))}
      {user ? (
        <div className="feature-comments-talk-container">
          <div className="feature-comments-talk-body">
            <Divider
              orientation="vertical"
              flexItem
              style={{
                marginRight: -18,
                marginBottom: -20,
                padding: 2,
                height: 1,
              }}
            />
            <Avatar
              alt="user"
              src={user.avatarUrl}
              style={{ width: 30, height: 30 }}
            />
            <div className="talk-bubble tri-right left-in">
              <textarea cols="40" rows="2"></textarea>
            </div>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginLeft: 10 }}
            >
              Add Comment
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
