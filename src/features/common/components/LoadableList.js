import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import './LoadableList.less';

export default function LoadableList(props) {
  const { loading, hasMore, onLoadClick, children, disabled } = { ...props };
  const onClick = () => {
    if (onLoadClick) {
      onLoadClick();
    }
  };

  return (
    <div className="common-loadable-list-container">
      <div className="common-loadable-list">{children}</div>
      {hasMore ? (
        <Button
          variant="outlined"
          color="primary"
          style={{
            marginTop: 12,
            marginBottom: 10,
            // display: 'block',
          }}
          disabled={loading || disabled}
          onClick={() => onClick()}
        >
          {loading ? <CircularProgress size={24} /> : 'LOAD MORE'}
        </Button>
      ) : null}
    </div>
  );
}
