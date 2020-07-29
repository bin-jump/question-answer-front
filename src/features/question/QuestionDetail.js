import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import QuestionTitle from './components/QuestionTitle';
import Answers from './components/Answers';
import SingleAnswer from './components/SingleAnswer';
import WriteAnswer from './components/WriteAnswer';
import { useReset } from './redux/hooks';
import './QuestionDetail.less';

export default function QuestionDetail(props) {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { resetState } = useReset();

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  return (
    <div className="feature-questiondetail">
      <Grid container spacing={1} style={{ margin: '50px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={7}>
          <QuestionTitle questionId={id} user={user} />

          <Route
            path={`/question/${id}/answer/:aid`}
            exact
            render={(props) => <SingleAnswer questionId={id} user={user} />}
          />

          <Route
            path={`/question/${id}`}
            exact
            render={(props) => <Answers questionId={id} user={user} />}
          />

          <Route
            path={`/question/${id}`}
            exact
            render={(props) => <WriteAnswer questionId={id} user={user} />}
          />
        </Grid>
      </Grid>
    </div>
  );
}
