import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import TagList from './TagList';
import { milisecToDate } from '../helper';

function Answer(props) {
  const anwser = props.anwser;
  return <div></div>;
}

export default function Question(props) {
  const question = props.question;
  const anwser = question.cover;

  return (
    <Paper
      elevation={1}
      square
      style={{ width: 650, minHeight: 180, margin: '8px 0' }}
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
          <Link to={`/user/${question.author.id}`}>{question.author.name}</Link>
          {` on ${milisecToDate(question.created)}.`}
        </div>

        <div className="common-question-tag-container">
          <TagList tags={question.tags} />
        </div>

        <div className="common-question-info-container">
          <div className="common-question-info">
            <ArrowUpwardIcon />
            <div className="common-question-info-word">3</div>
            <div className="common-question-info-word">UpVotes</div>
          </div>
          <div className="common-question-info">
            <CommentIcon />
            <div className="common-question-info-word">3</div>
            <div className="common-question-info-word">Answers</div>
          </div>
          <div className="common-question-info">
            <ThumbUpIcon />
            <div className="common-question-info-word">3</div>
            <div className="common-question-info-word">Good</div>
          </div>
        </div>
      </div>
    </Paper>
  );
}
