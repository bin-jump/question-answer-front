import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Pendable(props) {
  const { children, pending } = { ...props };
  return <div>{pending ? <CircularProgress size={24} /> : children}</div>;
}
