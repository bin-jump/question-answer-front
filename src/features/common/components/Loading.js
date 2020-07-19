import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading() {
  return (
    <div style={{ textAlign: 'center' }} key={0}>
      <CircularProgress />
    </div>
  );
}
