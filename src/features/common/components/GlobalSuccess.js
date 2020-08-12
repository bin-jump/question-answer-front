import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useShowSuccess } from '../redux/hooks';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function GlobalSuccess() {
  const { successMessage, closeSuccess, displaySuccess } = useShowSuccess();

  const handleClose = (event) => {
    closeSuccess();
  };

  return (
    <div>
      <Snackbar
        open={displaySuccess}
        autoHideDuration={7000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          style={{ minWidth: 180 }}
          onClose={handleClose}
          severity="success"
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
