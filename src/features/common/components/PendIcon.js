import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

export default function PendIcon(props) {
  const {
    children,
    pending,
    color,
    selected,
    disabled,
    onClick,
    pendSize,
    style,
  } = {
    ...props,
  };

  const size = pendSize ? pendSize : 20;

  return (
    <div style={{ ...style }}>
      <IconButton
        color={color || 'primary'}
        disabled={pending || disabled}
        onClick={onClick}
        style={{
          padding: 5,
          color: selected ? '#fccc55' : '#bcbcbc',
        }}
      >
        {pending ? <CircularProgress size={size} /> : children}
      </IconButton>
    </div>
  );
}
