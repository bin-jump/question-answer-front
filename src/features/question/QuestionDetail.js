import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import QuestionTitle from './components/QuestionTitle';

export default function QuestionDetail(props) {
  const { id } = useParams();
  return (
    <div>
      <Grid container spacing={1} style={{ margin: '50px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={7}>
          <QuestionTitle questionId={id} />
        </Grid>
      </Grid>{' '}
    </div>
  );
}
