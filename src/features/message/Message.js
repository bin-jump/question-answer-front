import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Conversation from './components/Conversation';
import Chat from './components/Chat';
import './Message.less';

export default function Message(props) {
  return (
    <div>
      <Grid container spacing={1} style={{ margin: '40px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Paper square style={{ height: 500, display: 'flex' }}>
            <div className="feature-message-conversation">
              <Conversation />
            </div>
            {/* <div style={{ borderLeft: '1px dashed green', height: 300 }} /> */}
            <div className="feature-message-chat">
              <Chat />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
