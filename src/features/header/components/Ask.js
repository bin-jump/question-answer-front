import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ContentEditor } from '../../common';
import './Ask.less';

export default function Ask() {
  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuestionChange = (content) => {
    setQuestion(content);
  };

  const handleContentChange = (content) => {
    setDescription(content);
  };

  const handleSubmit = () => {
    console.log({ question, description });
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          background: 'white',
          color: '#779ea6',
          width: '130px',
          fontSize: '12px',
        }}
        onClick={handleClickOpen}
      >
        Ask Question
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{'Ask a Question'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please write you question and description and click submit.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Question"
            fullWidth
            onChange={(event) => handleQuestionChange(event.target.value)}
          />
          <ContentEditor onContentChange={handleContentChange} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
