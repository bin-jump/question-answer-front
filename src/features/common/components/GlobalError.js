import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useShowError } from '../redux/hooks';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function GlobalError() {
  const { errorMessage, closeError, displayError } = useShowError();

  const handleClose = (event) => {
    closeError();
  };

  return (
    <div>
      <Snackbar
        open={displayError}
        autoHideDuration={7000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert style={{ minWidth: 360 }} onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
