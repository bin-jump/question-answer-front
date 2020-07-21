import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Pendable(props) {
  const { children, pending, pendContent, repeat } = { ...props };
  const content = pendContent ? (
    pendContent
  ) : (
    <CircularProgress size={24} style={{ display: 'block', margin: 8 }} />
  );
  const repeatNum = repeat ? repeat : 1;

  return (
    <div>{pending ? [...Array(repeatNum)].map((_) => content) : children}</div>
  );
}
