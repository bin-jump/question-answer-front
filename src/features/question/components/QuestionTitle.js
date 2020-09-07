import React, { useEffect, useState } from 'react';
import {
  useFetchQuestion,
  useFetchQuestionComment,
  useAddQuestionComment,
  useVoteQuestion,
  useFollowQuestion,
} from '../redux/hooks';
import { Link } from 'react-router-dom';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { milisecToDate } from '../../common/helper';
import Comments, { CommentButton } from './Comments';
import {
  Loading,
  QuestionLoading,
  Pendable,
  TagList,
  LoadableList,
  PendIcon,
  Content,
} from '../../common';
import './QuestionTitle.less';

export default function QuestionTitle(props) {
  const { questionId, user } = { ...props };
  const [showComment, setShowComment] = useState(false);

  const { question, fetchQuestion, fetchQuestionPending } = useFetchQuestion();
  const {
    questionComments,
    fetchQuestionComment,
    quesionCommentAfter,
    fetchQuestionCommentPending,
  } = useFetchQuestionComment();

  const {
    addQuestionComment,
    addQuestionCommentPending,
  } = useAddQuestionComment();

  const { voteQuestion, questionVotePending } = useVoteQuestion();
  const { followQuestion, questionFollowPending } = useFollowQuestion();

  const addComment = (content) => {
    //console.log(content);
    addQuestionComment(questionId, content);
  };

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
      <Pendable
        pending={!question || fetchQuestionPending}
        pendContent={<QuestionLoading />}
      >
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
                    alt={question.author.name}
                    src={question.author.avatarUrl}
                    style={{ margin: 'auto', marginBottom: 10 }}
                  />
                  <PendIcon
                    selected={question.upvoted}
                    onClick={() =>
                      voteQuestion(questionId, 'UPVOTE', question.upvoted)
                    }
                    pending={questionVotePending}
                    //disabled={true}
                  >
                    <ThumbUpIcon />
                  </PendIcon>

                  <div>{question.upvoteCount}</div>
                  <PendIcon
                    pending={questionFollowPending}
                    selected={question.following}
                    onClick={() =>
                      followQuestion(questionId, question.following)
                    }
                  >
                    <RssFeedIcon />
                  </PendIcon>

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
                  <Link to={`/profile/${question.author.id}`}>
                    {question.author.name}
                  </Link>
                  {` on ${milisecToDate(question.created)}.`}
                </div>
                <TagList tags={question.tags} />
                <hr />
                <div className="feature-question-title-body">
                  <Content content={question.body} />
                </div>
                {showComment ? (
                  <LoadableList
                    hasMore={quesionCommentAfter}
                    loading={fetchQuestionCommentPending}
                    onLoadClick={() =>
                      fetchQuestionComment(questionId, quesionCommentAfter)
                    }
                  >
                    <Comments
                      comments={questionComments}
                      commentCount={question.commentCount}
                      user={user}
                      pending={fetchQuestionCommentPending}
                      addPending={addQuestionCommentPending}
                      addCommentHandler={addComment}
                    />
                  </LoadableList>
                ) : (
                  <CommentButton
                    clickHandler={() => setShowComment(true)}
                    commentCount={question.commentCount}
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        ) : null}
      </Pendable>
    </div>
  );
}
