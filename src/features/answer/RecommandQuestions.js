import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DraftsRoundedIcon from '@material-ui/icons/DraftsRounded';
import { useFetchQuestions } from './redux/fetchQuestions';
import { Pendable, QuestionLoading, Question, LoadableList } from '../common';

export default function RecommandQuestions(props) {
  const {
    questions,
    hasMore,
    fetchQuestion,
    fetchQuestionsPending,
    reset,
  } = useFetchQuestions();

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <div>
      <Grid container spacing={0} style={{ margin: '30px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={7}>
          <LoadableList
            hasMore={hasMore}
            loading={fetchQuestionsPending}
            onLoadClick={() => fetchQuestion(questions.length)}
          >
            <Pendable
              pending={fetchQuestionsPending && questions.length === 0}
              pendContent={<QuestionLoading style={{ width: 650 }} />}
              repeat={5}
            >
              {questions.length > 0 ? (
                questions.map((item) => <Question question={item} />)
              ) : (
                <div className="list-empty-sign">
                  <DraftsRoundedIcon
                    style={{ width: 80, height: 80, color: '#bcbcbc' }}
                  />
                  <div className="list-empty-sign-words">No Content</div>
                </div>
              )}
            </Pendable>
          </LoadableList>
        </Grid>
      </Grid>
    </div>
  );
}
