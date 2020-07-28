import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Conversation from './components/Conversation';
import Chat from './components/Chat';
import { useChatReset, useResetState } from './redux/hooks';
import './Message.less';

export default function Message(props) {
  const [chatUser, setChatUser] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const { resetChat } = useChatReset();
  const { resetState } = useResetState();

  const selectUser = (user) => {
    resetChat();
    setChatUser(user);
  };

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  const userAlreadyPin = useSelector((state) => state.auth.userAlreadyPin);
  if (userAlreadyPin && user === null) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <Grid container spacing={1} style={{ margin: '40px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Paper square style={{ height: 500, display: 'flex' }}>
            <div className="feature-message-conversation">
              <Conversation chatUser={chatUser} selectUser={selectUser} />
            </div>
            {/* <div style={{ borderLeft: '1px dashed green', height: 300 }} /> */}
            <div className="feature-message-chat">
              <Chat user={user} chatUser={chatUser} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
