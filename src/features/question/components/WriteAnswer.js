import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { useAddAnswer } from '../redux/hooks';
import {
  toHtml,
  CreateEmptyState,
  ContentEditor,
  PendButton,
} from '../../common';

export default function WriteAnswer(props) {
  const { questionId, user } = { ...props };
  //const editorState = CreateEmptyState();
  const [editorState, setEditorState] = useState(CreateEmptyState());
  const location = useLocation();
  const focus = location.hash === '#write';

  const { addAnswer, addAnswerPending } = useAddAnswer();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onPostAnser = () => {
    let content = toHtml(editorState.getCurrentContent());
    //console.log(content);
    addAnswer(questionId, content);
    setEditorState(CreateEmptyState());
  };

  return (
    <div id="write" className="feature-question-write">
      {user ? (
        <Paper square style={{ minHeight: 180, padding: '20px 20px' }}>
          <Typography variant="h6" style={{ display: 'flex' }}>
            Write your answer
            <Avatar
              alt="User"
              src={user.avatarUrl}
              style={{ height: 25, width: 25, marginLeft: 10 }}
            />
          </Typography>
          <hr />
          <ContentEditor
            onEditorStateChange={onEditorStateChange}
            editorState={editorState}
            autoFocus={focus}
          />
          <div>
            <PendButton
              onClick={() => onPostAnser()}
              style={{ color: 'white' }}
              pending={addAnswerPending}
            >
              Post Answer
            </PendButton>
          </div>
        </Paper>
      ) : null}
    </div>
  );
}
