import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function PendingButton(props) {
  const { children, style, pending, variant, disabled, color, onClick } = {
    ...props,
  };
  return (
    <Button
      variant={variant || 'contained'}
      color={color || 'primary'}
      style={{ ...style, color: 'white' }}
      disabled={pending || disabled}
      onClick={onClick}
    >
      {pending ? <CircularProgress size={24} /> : children}
    </Button>
  );
}
