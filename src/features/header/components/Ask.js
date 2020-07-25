import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  toHtml,
  CreateEmptyState,
  ContentEditor,
  PendButton,
} from '../../common';
import { useAddQuestion } from '../../home/redux/addQuestion';
import './Ask.less';

export default function Ask(props) {
  const TAG_NUM_LIMIT = 5;
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    title: '',
    tagName: '',
    tags: [],
  });
  const { addQuestion, addQuestionPending } = useAddQuestion();
  const [editorState, setEditorState] = useState(CreateEmptyState());
  const { user } = { ...props };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTagDelete = (tag) => {
    setValues({
      ...values,
      tags: values.tags.filter((item) => item.label !== tag.label),
    });
  };

  const handleTagAdd = () => {
    if (!values.tagName) {
      return;
    }
    if (
      values.tags.filter((item) => item.label === values.tagName).length > 0
    ) {
      return;
    }

    setValues({
      ...values,
      tags: [...values.tags, { label: values.tagName }],
      tagName: '',
    });
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSubmit = () => {
    if (values.tags.length >= TAG_NUM_LIMIT) {
      return;
    }
    if (!values.title) {
      return;
    }
    let content = toHtml(editorState.getCurrentContent());
    // if (!editorState.getCurrentContent().hasText()) {
    //   return;
    // }
    let question = { title: values.title, body: content, tags: values.tags };
    addQuestion(question);
    setEditorState(CreateEmptyState());
    handleClose();
  };

  return (
    <div>
      <PendButton
        variant="contained"
        style={{
          background: 'white',
          color: '#779ea6',
          width: '130px',
          fontSize: '12px',
        }}
        onClick={handleClickOpen}
        pending={addQuestionPending}
        //disabled={user == null}
      >
        Ask Question
      </PendButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Ask a Question'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please write you question and description and click submit.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Question"
            fullWidth
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
          {/* <ContentEditor onContentChange={handleContentChange} /> */}
          <ContentEditor
            onEditorStateChange={onEditorStateChange}
            editorState={editorState}
          />
          <div className="feature-header-ask">
            <TextField
              value={values.tagName}
              style={{ margin: '0 20px', width: 180 }}
              placeholder={'max 5 tags, word only...'}
              onChange={(e) =>
                setValues({ ...values, tagName: e.target.value })
              }
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleTagAdd()}
            >
              Add Tag
            </Button>
            <div
              style={{
                margin: '5px 10px 0 0',
                fontSize: 16,
                display: 'inline-block',
                width: 100,
                float: 'right',
                color: TAG_NUM_LIMIT >= values.tags.length ? '' : 'red',
              }}
            >{`${
              TAG_NUM_LIMIT - values.tags.length
            } / ${TAG_NUM_LIMIT} remains`}</div>
          </div>
          <div>
            {values.tags.map((item) => {
              return (
                <li>
                  <Chip
                    label={item.label}
                    onDelete={() => handleTagDelete(item)}
                  />
                </li>
              );
            })}
          </div>
        </DialogContent>

        <DialogActions>
          <PendButton
            onClick={handleSubmit}
            style={{
              color: 'white',
              marginLeft: '100px',
            }}
            pending={addQuestionPending}
          >
            Submit
          </PendButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
