import React from 'react';
import { useParams, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import QuestionList from './components/QuestionList';
import AnswerList from './components/AnswerList';
import UserList from './components/UserList';
import Head from './components/Head';

export default function Profile(props) {
  const { id } = useParams();

  return (
    <div>
      <Head id={id} />
      <Grid container spacing={1} style={{ margin: '50px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={7}>
          <div>
            <Route
              path={`/profile/${id}/question`}
              render={(props) => <QuestionList id={id} />}
            />
            <Route
              path={`/profile/${id}/answer`}
              render={(props) => <AnswerList id={id} />}
            />
            <Route
              path={`/profile/${id}/follow`}
              render={(props) => <UserList id={id} />}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
