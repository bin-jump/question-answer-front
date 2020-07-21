import React, { useEffect } from 'react';
import {
  useFetchAnswers,
  useFetchAnswerComment,
  useAddAnswerComment,
  useVoteAnswer,
} from '../redux/hooks';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CreateIcon from '@material-ui/icons/Create';
//import InfiniteScroll from 'react-infinite-scroller';
import {
  Loading,
  LoadableList,
  PendButton,
  PendIcon,
  Content,
} from '../../common';
import Comments, { CommentButton } from './Comments';
import { milisecToDate } from '../../common/helper';
import './Answers.less';

function Answer(props) {
  const {
    answer,
    idx,
    size,
    user,
    commentLoadHandle,
    addCommentHandler,
    voteHandler,
  } = {
    ...props,
  };

  const handleCommentAdd = (content) => {
    addCommentHandler(answer.id, content);
  };

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
          <div className="feature-question-title-side feature-question-answer-side">
            <PendIcon
              pending={answer.votePending}
              selected={answer.upvoted}
              onClick={() => voteHandler(answer.id, 'UPVOTE', answer.upvoted)}
            >
              <ArrowDropUpIcon style={{ fontSize: 40 }} />
            </PendIcon>

            <div style={{ fontSize: 20 }}>{answer.upvoteCount}</div>
            <PendIcon
              pending={answer.votePending}
              selected={answer.downvoted}
              onClick={() =>
                voteHandler(answer.id, 'DOWNVOTE', answer.downvoted)
              }
            >
              <ArrowDropDownIcon style={{ fontSize: 40 }} />
            </PendIcon>
          </div>
        </Grid>
        <Grid item xs={10} style={{ display: 'inline-block', marginLeft: 16 }}>
          <Content content={answer.body} />
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
          {answer.commentPending || answer.showComment ? (
            <LoadableList
              hasMore={answer.commentAfter}
              loading={answer.commentPending}
              onLoadClick={() =>
                commentLoadHandle(answer.id, answer.commentAfter)
              }
            >
              <Comments
                comments={answer.comments}
                commentCount={answer.commentCount}
                user={user}
                pending={answer.commentPending}
                addPending={answer.addCommentPending}
                addCommentHandler={handleCommentAdd}
              />
            </LoadableList>
          ) : (
            <CommentButton
              clickHandler={() =>
                commentLoadHandle(answer.id, answer.commentAfter)
              }
              commentCount={answer.commentCount}
              style={{ float: 'right', marginTop: 10 }}
            />
          )}
        </Grid>
      </Grid>

      {idx + 1 < size ? (
        <hr style={{ borderTop: '1px solid #ced7de' }} />
      ) : null}
    </div>
  );
}

export default function Answers(props) {
  const { questionId, user } = { ...props };
  const question = useSelector((state) => state.question.question);
  const answerCount = question ? question.answerCount : 0;

  const {
    answers,
    fetchAnswerAfter,
    fetchAnswers,
    fetchAnswerPending,
  } = useFetchAnswers();

  const { fetchAnswerComment } = useFetchAnswerComment();

  const { addAnswerComment } = useAddAnswerComment();

  const { voteAnswer } = useVoteAnswer();

  useEffect(() => {
    fetchAnswers(questionId);
  }, [fetchAnswers, questionId]);

  return (
    <div className="feature-question-answer-list">
      {fetchAnswerPending && answers.length === 0 ? (
        <Loading />
      ) : (
        <Paper square style={{ minHeight: 180, padding: '20px 20px' }}>
          <Typography variant="h6">{`${answerCount} Answer(s)`}</Typography>
          <hr />
          <div className="feature-question-answer-list-inner">
            {answerCount === 0 ? (
              <div>
                <div>
                  {'Seems no one answered yet. '}
                  <Button
                    color="primary"
                    component={HashLink}
                    to={`/question/${questionId}#write`}
                    style={{ fontSize: 12 }}
                  >
                    <CreateIcon
                      style={{ marginRight: 5, marginBottom: 2, fontSize: 18 }}
                    />
                    {'Write One'}
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {answers.map((item, i) => (
                  <Answer
                    answer={item}
                    idx={i}
                    size={answers.length}
                    commentLoadHandle={fetchAnswerComment}
                    addCommentHandler={addAnswerComment}
                    voteHandler={voteAnswer}
                    user={user}
                  />
                ))}
                {fetchAnswerAfter ? (
                  <PendButton
                    pending={fetchAnswerPending}
                    style={{ width: '100%', height: 50, color: 'white' }}
                    onClick={() => fetchAnswers(questionId, fetchAnswerAfter)}
                  >
                    {'Load more answers...'}
                  </PendButton>
                ) : null}
              </div>
            )}
          </div>
          {/* <InfiniteScroll
                pageStart={0}
                loadMore={() => fetchAnswers(questionId, fetchAnswerAfter)}
                hasMore={fetchAnswerAfter}
                loader={<Loading />}
              >
                {answers.map((item, i) => (
                  <Answer
                    answer={item}
                    idx={i}
                    size={answers.length}
                    commentLoadHandle={fetchAnswerComment}
                    user={user}
                  />
                ))}
              </InfiniteScroll> */}

          {/* <Button>Load more answers...</Button> */}
        </Paper>
      )}
    </div>
  );
}
