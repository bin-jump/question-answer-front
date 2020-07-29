import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useFetchSingleAnswer,
  useResetAnswers,
  useFetchAnswerComment,
  useAddAnswerComment,
  useVoteAnswer,
} from '../redux/hooks';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Comments from './Comments';
import {
  AnswerLoading,
  Pendable,
  LoadableList,
  PendIcon,
  Content,
} from '../../common';
import { milisecToDate } from '../../common/helper';
import './Answers.less';

export default function SingleAnswer(props) {
  const { aid } = useParams();
  const { questionId, user } = { ...props };
  const {
    answers,
    fetchSingleAnswer,
    fetchAnswerPending,
  } = useFetchSingleAnswer();

  const { fetchAnswerComment } = useFetchAnswerComment();
  const { addAnswerComment } = useAddAnswerComment();
  const { voteAnswer } = useVoteAnswer();
  const { resetAnswers } = useResetAnswers();

  const handleCommentAdd = (content) => {
    addAnswerComment(answer.id, content);
  };

  useEffect(() => {
    return () => {
      resetAnswers();
    };
  }, [resetAnswers]);

  useEffect(() => {
    fetchSingleAnswer(aid);
  }, [fetchSingleAnswer, aid]);

  const answer = answers.length > 0 ? answers[0] : null;

  return (
    <div>
      <Paper square style={{ marginTop: 20, padding: 20, textAlign: 'center' }}>
        <Link
          style={{ textDecoration: 'none', color: '#2cafdb', fontSize: 18 }}
          to={`/question/${questionId}`}
        >
          Show all Answers...
        </Link>
      </Paper>
      <Pendable
        pending={fetchAnswerPending && answers.length === 0}
        repeat={1}
        pendContent={<AnswerLoading style={{ marginTop: 20 }} />}
      >
        {answer ? (
          <Paper square style={{ marginTop: 20, padding: '45px 20px 0 20px' }}>
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
                    disabled={answer.votePending}
                    pending={answer.votePendingType === 'UPVOTE'}
                    selected={answer.upvoted}
                    size={30}
                    onClick={() =>
                      voteAnswer(answer.id, 'UPVOTE', answer.upvoted)
                    }
                  >
                    <ArrowDropUpIcon style={{ fontSize: 40 }} />
                  </PendIcon>

                  <div style={{ fontSize: 20 }}>{answer.upvoteCount}</div>
                  <PendIcon
                    disabled={answer.votePending}
                    pending={answer.votePendingType === 'DOWNVOTE'}
                    selected={answer.downvoted}
                    onClick={() =>
                      voteAnswer(answer.id, 'DOWNVOTE', answer.downvoted)
                    }
                  >
                    <ArrowDropDownIcon style={{ fontSize: 40 }} />
                  </PendIcon>
                </div>
              </Grid>
              <Grid
                item
                xs={10}
                style={{ display: 'inline-block', marginLeft: 16 }}
              >
                <Content content={answer.body} />
                <div className="feature-question-answer-author">
                  {`Posted by `}
                  <Avatar
                    alt={answer.author.name}
                    src={answer.author.avatarUrl}
                    style={{ margin: 'auto' }}
                  />
                  <Link
                    to={`/profile/${answer.author.id}`}
                  >{` ${answer.author.name} `}</Link>
                  {` on ${milisecToDate(answer.created)}.`}
                </div>

                <LoadableList
                  hasMore={answer.commentAfter}
                  loading={answer.commentPending}
                  onLoadClick={() =>
                    fetchAnswerComment(answer.id, answer.commentAfter)
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
              </Grid>
            </Grid>
          </Paper>
        ) : null}
      </Pendable>
    </div>
  );
}
