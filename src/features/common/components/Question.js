import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CommentIcon from '@material-ui/icons/Comment';
//import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import CreateIcon from '@material-ui/icons/Create';
import TagList from './TagList';
import Content from './Content';
import { milisecToDate } from '../helper';

function Answer(props) {
  const answer = props.answer;
  const [show, setShow] = useState(true);
  const LEN_LIMIT = 120;

  useEffect(() => {
    if (answer.body.length > LEN_LIMIT) {
      setShow(false);
    }
  }, [answer]);

  const content = show ? (
    <Content content={`${answer.body}`} />
  ) : (
    `${answer.body.slice(0, LEN_LIMIT)} `
  );
  return (
    <div className="common-question-answer">
      <div className="common-question-answer-content">
        <Link
          to={`/profile/${answer.author.id}`}
        >{`${answer.author.name}`}</Link>
        {': '}
        {content}
        {show ? null : (
          <div
            style={{
              display: 'inline',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => setShow(true)}
          >
            {'[show all...]'}
          </div>
        )}
      </div>
      <div className="common-answer-info-container">
        <div className="common-answer-info">
          <ArrowUpwardIcon />
          <div className="common-answer-info-word">3</div>
          <div className="common-answer-info-word">UpVotes</div>
        </div>
        <div className="common-answer-info">
          <CommentIcon />
          <div className="common-answer-info-word">3</div>
          <div className="common-answer-info-word">Answers</div>
        </div>
      </div>
    </div>
  );
}

export default function Question(props) {
  const { question } = { ...props };
  const answer = question.cover;

  return (
    <Paper
      elevation={1}
      square
      style={{ width: 650, minHeight: 150, marginBottom: 8 }}
    >
      <div style={{ padding: '20px 30px' }}>
        <div className="common-question-title">
          <Typography
            variant="h6"
            component={Link}
            to={`/question/${question.id}`}
          >
            {question.title}
          </Typography>
        </div>
        <div className="common-question-author">
          {`Asked by `}
          <Link to={`/profile/${question.author.id}`}>
            {question.author.name}
          </Link>
          {` on ${milisecToDate(question.created)}.`}
        </div>
        <div className="common-question-tag-container">
          <TagList tags={question.tags} />
        </div>
        {answer ? (
          <Answer answer={answer} />
        ) : (
          <div className="common-question-info-container">
            {/* <Button color="primary" variant="outlined" style={{ height: 35 }}>
              Follow
            </Button> */}
            <Button
              color="primary"
              variant="outlined"
              style={{ height: 35 }}
              component={HashLink}
              to={`/question/${question.id}#write`}
            >
              <CreateIcon style={{ marginRight: 5 }} /> Write Answer
            </Button>

            <div className="common-question-info">
              <RssFeedIcon />
              <div className="common-question-info-word">
                {question.followCount}
              </div>
              <div className="common-question-info-word">Follow</div>
            </div>
          </div>
        )}
      </div>
    </Paper>
  );
}
