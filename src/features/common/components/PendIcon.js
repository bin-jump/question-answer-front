import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

export default function PendIcon(props) {
  const { children, pending, color, selected, onClick } = { ...props };

  return (
    <div>
      <IconButton
        color={color || 'primary'}
        disabled={pending}
        onClick={onClick}
        style={{ padding: 5, color: selected ? '#fccc55' : '#bcbcbc' }}
      >
        {pending ? <CircularProgress size={16} /> : children}
      </IconButton>
    </div>
  );
}
