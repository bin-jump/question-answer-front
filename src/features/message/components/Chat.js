import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { LoadableList, PendButton } from '../../common';
import './Chat.less';

function ChatList(props) {
  return <div>chats</div>;
}

export default function Chat(props) {
  const { chatUser } = { ...props };
  const [message, setMessage] = useState('');

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {chatUser ? (
        <div>
          <div className="feature-message-chat-head">
            <Typography style={{ marginTop: 10, fontSize: 18 }}>
              {chatUser.name}
            </Typography>
          </div>
          <hr style={{ width: '80%' }} />
          <div className="feature-message-chat-content">
            <ChatList />
          </div>
          <hr style={{ width: '90%' }} />
          <div className="feature-message-chat-operate">
            <TextField style={{ width: 320, margin: '10px 15px 0 25px' }} />
            <PendButton variant="outlined" style={{ marginTop: 10 }}>
              <SendIcon style={{ marginRight: 5 }} /> Send
            </PendButton>
          </div>
        </div>
      ) : (
        <div className="feature-message-chat-empty">
          <MailOutlineIcon
            style={{
              marginTop: 160,
              width: 150,
              height: 150,
              color: '#dedede',
            }}
          />
        </div>
      )}
    </div>
  );
}
