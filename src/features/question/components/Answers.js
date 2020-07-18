import React, { useEffect, useState } from 'react';
import { useFetchAnswers, useFetchAnswerComment } from '../redux/hooks';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CircularProgress from '@material-ui/core/CircularProgress';
import Comments from './Comments';
import { milisecToDate } from '../../common/helper';
import './Answers.less';

function Answer(answer, idx, size, commentLoadHandle) {
  //const {comments, commentCount, showComment, author, body} = {...answer};

  return (
    <div className="feature-question-answer-container">
      <Grid container spacing={1}>
        <Grid
          item
          xs={1}
          style={{
            textAlign: 'center',
            color: '#1aa1ce',
            display: 'inline-block',
          }}
        >
          <div className="feature-question-title-side">
            <ArrowDropUpIcon
              style={{ fontSize: 40, marginTop: 1 }}
              className={answer.upvoted ? 'icon-selected' : ''}
            />
            <div style={{ fontSize: 20 }}>{answer.upvoteCount}</div>
            <ArrowDropDownIcon style={{ fontSize: 40, marginTop: 1 }} />
          </div>
        </Grid>
        <Grid item xs={10} style={{ display: 'inline-block', marginLeft: 16 }}>
          {answer.body}
          <div className="feature-question-answer-author">
            {`Posted by `}
            <Avatar
              alt="User"
              src={answer.author.avatarUrl}
              style={{ margin: 'auto' }}
            />
            <Link
              to={`/user/${answer.author.id}`}
            >{` ${answer.author.name} `}</Link>
            {` on ${milisecToDate(answer.created)}.`}
          </div>
          {answer.showComment ? (
            <Comments
              comments={answer.comments}
              commentCount={answer.commentCount}
              user={answer.user}
            />
          ) : (
            <Button
              color="primary"
              disabled={answer.commentCount === 0}
              onClick={() => commentLoadHandle(answer.id, answer.commentAfter)}
            >
              <QuestionAnswerIcon
                style={{ marginRight: 5, marginBottom: 10 }}
              />
              {`${answer.commentCount} Comment`}
            </Button>
          )}
        </Grid>
      </Grid>

      <hr />
    </div>
  );
}

export default function Answers(props) {
  const { questionId, user } = { ...props };
  const question = useSelector((state) => state.question.question);
  const answerCount = question ? question.answerCount : 0;

  const {
    answers,
    answerAfter,
    fetchAnswers,
    fetchAnswerPending,
  } = useFetchAnswers();

  const { fetchAnswerComment } = useFetchAnswerComment();

  useEffect(() => {
    fetchAnswers(questionId);
  }, [fetchAnswers, questionId]);

  return (
    <div className="feature-question-answer-list">
      {fetchAnswerPending ? (
        <CircularProgress />
      ) : (
        <Paper square style={{ minHeight: 180, padding: '20px 20px' }}>
          {answerCount === 0 ? (
            'No answer yet.'
          ) : (
            <div>
              <div>{`${answerCount} Answer(s)`}</div>
              <hr />
              {answers.map((item, i) =>
                Answer(item, i, answers.length, fetchAnswerComment),
              )}
            </div>
          )}
        </Paper>
      )}
    </div>
  );
}
