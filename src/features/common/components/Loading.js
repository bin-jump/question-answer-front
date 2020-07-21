import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';

export function QuestionLoading(props) {
  const { style } = { ...props };
  return (
    <Paper square style={{ padding: '20px 30px', marginBottom: 10, ...style }}>
      <Skeleton variant="text" height={50} width={500} />
      <Skeleton variant="text" height={30} width={260} />
      <Skeleton variant="text" height={25} />
      <Skeleton variant="text" height={25} />
      <Skeleton variant="text" height={25} width={350} />
    </Paper>
  );
}

export function AnswerLoading(props) {
  const { style } = { ...props };
  return (
    <Paper square style={{ padding: '20px 30px', marginBottom: 10, ...style }}>
      <Skeleton variant="text" height={25} />
      <Skeleton variant="text" height={25} />
      <Skeleton variant="text" height={25} />
      <Skeleton variant="text" height={25} width={350} />
    </Paper>
  );
}

export default function Loading() {
  return (
    <div style={{ textAlign: 'center' }} key={0}>
      <CircularProgress />
    </div>
  );
}
