import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import QuestionTitle from './components/QuestionTitle';
import Answers from './components/Answers';
import './QuestionDetail.less';

export default function QuestionDetail(props) {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="feature-questiondetail">
      <Grid container spacing={1} style={{ margin: '50px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={7}>
          <QuestionTitle questionId={id} user={user} />
          <Answers questionId={id} user={user} />
        </Grid>
      </Grid>
    </div>
  );
}
