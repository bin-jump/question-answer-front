import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DraftsRoundedIcon from '@material-ui/icons/DraftsRounded';
import { useFetchQuestionList } from './redux/hooks';
import Question from '../common/components/Question';
import './Home.less';

export default function Home(props) {
  const {
    questionList,
    questionAfter,
    fetchQuestionList,
    fetchQuestionListPending,
  } = useFetchQuestionList();

  useEffect(() => {
    fetchQuestionList();
  }, [fetchQuestionList]);

  return (
    <div className="feature-home">
      <Grid container spacing={1} style={{ margin: '50px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <div className="list-container">
            {questionList.length > 0 ? (
              questionList.map((item) => <Question question={item} />)
            ) : (
              <div className="list-empty-sign">
                <DraftsRoundedIcon
                  style={{ width: 80, height: 80, color: '#bcbcbc' }}
                />
                <div className="list-empty-sign-words">No Content</div>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
