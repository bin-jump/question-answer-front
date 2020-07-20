import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { milisecToDate } from '../../common/helper';
import Button from '@material-ui/core/Button';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { Loading, PendButton } from '../../common';
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

export function CommentButton(props) {
  const { commentCount, clickHandler, style } = { ...props };
  return (
    <Button
      color="primary"
      disabled={commentCount === 0}
      onClick={clickHandler}
      style={{ display: 'flex', ...style }}
    >
      <QuestionAnswerIcon style={{ marginRight: 5, marginTop: 4 }} />
      {`${commentCount} Comment`}
    </Button>
  );
}

export default function Comments(props) {
  const {
    comments,
    user,
    commentCount,
    pending,
    addPending,
    addCommentHandler,
  } = {
    ...props,
  };
  const [cmtContent, setCmtContent] = useState('');

  // in case if new comment added while comment counter not updated...
  const commentCnt =
    comments.length > commentCount ? comments.length : commentCount;

  const onCommantAdd = () => {
    if (!cmtContent) {
      return;
    }
    if (addCommentHandler) {
      addCommentHandler(cmtContent);
    }
    setCmtContent('');
  };

  return (
    <div className="feature-comments">
      <div className="feature-comments-title">{`${commentCnt} Comment`}</div>
      <hr />
      {comments.map((item, i) => Comment(i, item, comments.length, user))}
      {pending && comments.length === 0 ? <Loading /> : null}
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
              <textarea
                cols="40"
                rows="2"
                value={cmtContent}
                onChange={(e) => setCmtContent(e.target.value)}
              ></textarea>
            </div>
            <PendButton
              variant="outlined"
              color="primary"
              style={{ marginLeft: 10, height: 70 }}
              onClick={onCommantAdd}
              pending={addPending}
            >
              Add Comment
            </PendButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
