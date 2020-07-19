import React, { useEffect, useState } from 'react';
import { useFetchQuestion, useFetchQuestionComment } from '../redux/hooks';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { milisecToDate } from '../../common/helper';
import Comments from './Comments';
import { TagList, LoadableList } from '../../common';
import './QuestionTitle.less';

export default function QuestionTitle(props) {
  const { questionId, user } = { ...props };
  //console.log(location);

  const { question, fetchQuestion, fetchQuestionPending } = useFetchQuestion();
  const {
    questionComments,
    fetchQuestionComment,
    quesionCommentAfter,
    fetchQuestionCommentPending,
  } = useFetchQuestionComment();

  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    fetchQuestion(questionId);
  }, [fetchQuestion, questionId]);

  useEffect(() => {
    if (showComment) {
      fetchQuestionComment(questionId);
    }
  }, [fetchQuestionComment, questionId, showComment]);

  return (
    <div>
      {question ? (
        <Paper square style={{ minHeight: 240, padding: '20px 20px' }}>
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
                <Avatar
                  alt="User"
                  src={question.author.avatarUrl}
                  style={{ margin: 'auto' }}
                />
                <ThumbUpIcon
                  className={question.thumbup ? 'icon-selected' : ''}
                />
                <div>{question.goodCount}</div>
                <RssFeedIcon
                  className={question.following ? 'icon-selected' : ''}
                />
                <div>{question.followCount}</div>
              </div>
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
              {showComment ? (
                <LoadableList
                  hasMore={quesionCommentAfter}
                  loading={fetchQuestionCommentPending}
                  onLoadClick={() => fetchQuestionComment(questionId)}
                >
                  <Comments
                    comments={questionComments}
                    commentCount={question.commentCount}
                    user={user}
                  />
                </LoadableList>
              ) : (
                <Button
                  color="primary"
                  disabled={question.commentCount === 0}
                  onClick={() => setShowComment(true)}
                  style={{ marginTop: -12 }}
                >
                  <QuestionAnswerIcon
                    style={{ marginRight: 5, marginBottom: 10 }}
                  />
                  {`${question.commentCount} Comment`}
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
