import React, { useState, useEffect } from 'react';
import { useFetchQuestion } from '../redux/hooks';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CircularProgress from '@material-ui/core/CircularProgress';
import TagList from '../../common/components/TagList';
import { milisecToDate } from '../../common/helper';
import './QuestionTitle.less';

export default function QuestionTitle(props) {
  const { question, fetchQuestion, fetchQuestionPending } = useFetchQuestion();
  const questionId = props.questionId;

  useEffect(() => {
    fetchQuestion(questionId);
  }, [fetchQuestion, questionId]);

  return (
    <div>
      {question ? (
        <Paper square style={{ minHeight: 240, padding: '20px 20px' }}>
          <Grid container spacing={1}>
            <Grid item xs={1} style={{ textAlign: 'center', color: '#1aa1ce' }}>
              <Avatar
                alt="User"
                src={question.author.avatarUrl}
                style={{ margin: 'auto' }}
              />
              <ThumbUpIcon
                style={{
                  fontSize: 20,
                  color: '#bcbcbc',
                  marginTop: 20,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
              <div>{question.goodCount}</div>
            </Grid>
            <Grid
              item
              xs={10}
              style={{ display: 'inline-block', marginLeft: 16 }}
            >
              <Typography variant="h6">{question.title}</Typography>
              <div className="feature-question-title-author">
                {`Asked by `}
                <Link to={`/user/${question.author.id}`}>
                  {question.author.name}
                </Link>
                {` on ${milisecToDate(question.created)}.`}
              </div>
              <TagList tags={question.tags} />
              <hr />
              <div className="feature-question-title-body">{question.body}</div>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
