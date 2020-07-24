import React from 'react';
import { useParams, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import QuestionList from './components/QuestionList';
import UserList from './components/UserList';
import UserInfo from './components/UserInfo';
import Head from './components/Head';

export default function Profile(props) {
  const { id } = useParams();

  return (
    <div>
      <Head id={id} />
      <Grid container spacing={1} style={{ margin: '40px 0', width: '100%' }}>
        <Grid item xs={1} />
        <Grid item xs={7}>
          <div>
            <Route
              path={`/profile/${id}`}
              render={(props) => (
                <QuestionList id={id} url={`/api/user/${id}/questions`} />
              )}
            />
            <Route
              path={`/profile/${id}/question`}
              render={(props) => (
                <QuestionList id={id} url={`/api/user/${id}/questions`} />
              )}
            />
            <Route
              path={`/profile/${id}/answer`}
              render={(props) => (
                <QuestionList id={id} url={`/api/user/${id}/answers`} />
              )}
            />
            <Route
              path={`/profile/${id}/follow`}
              render={(props) => (
                <QuestionList id={id} url={`/api/user/${id}/follow`} />
              )}
            />
            <Route
              path={`/profile/${id}/followee`}
              render={(props) => (
                <UserList id={id} url={`/api/user/${id}/followee`} />
              )}
            />
            <Route
              path={`/profile/${id}/follower`}
              render={(props) => (
                <UserList id={id} url={`/api/user/${id}/follower`} />
              )}
            />
          </div>
        </Grid>
        <Grid item xs={3} style={{ display: 'block' }}>
          <UserInfo id={id} />
        </Grid>
      </Grid>
    </div>
  );
}
