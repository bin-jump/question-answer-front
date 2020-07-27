import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import { useFetchMessages } from '../redux/hooks';
import { LoadableList, PendButton } from '../../common';
import { milisecToTime } from '../../common/helper';
import './Chat.less';

function ChatItemMe(props) {
  const { messageSender, message } = { ...props };

  return (
    <div className="feature-message-chat-item">
      <div
        style={{ marginLeft: 70 }}
        className="feature-message-chat-bubble-me feature-message-chat-bubble-rightin"
      >
        {message.body}
      </div>
      <div style={{ marginLeft: 10 }}>
        <Avatar
          alt={messageSender.name}
          src={messageSender.avatarUrl}
          style={{
            border: '1px solid #dce3e8',
            width: 30,
            height: 30,
            marginLeft: 8,
          }}
        />
        <div
          style={{ fontSize: 10, color: 'grey', marginTop: 3, marginLeft: 8 }}
        >
          {milisecToTime(message.created)}
        </div>
      </div>
    </div>
  );
}

function ChatItemYou(props) {
  const { messageSender, message } = { ...props };

  return (
    <div className="feature-message-chat-item">
      <div>
        <Avatar
          alt={messageSender.name}
          src={messageSender.avatarUrl}
          style={{
            border: '1px solid #dce3e8',
            width: 30,
            height: 30,
            marginRight: 8,
          }}
        />
        <div style={{ fontSize: 10, color: 'grey', marginTop: 3 }}>
          {milisecToTime(message.created)}
        </div>
      </div>

      <div className="feature-message-chat-bubble-you feature-message-chat-bubble-leftin">
        {message.body}
      </div>
    </div>
  );
}

function ChatItem(props) {
  const { chatUser, user, message } = { ...props };
  const messageSender = message.fromMe ? user : chatUser;

  return (
    <div style={{ width: '100%', display: 'flex' }}>
      {message.fromMe ? (
        <ChatItemMe message={message} messageSender={messageSender} />
      ) : (
        <ChatItemYou message={message} messageSender={messageSender} />
      )}
    </div>
  );
}

export default function Chat(props) {
  const { chatUser, user } = { ...props };
  const [message, setMessage] = useState('');

  const {
    messages,
    fetchMessagePending,
    fetchMessageAfter,
    fetchMessages,
  } = useFetchMessages();

  useEffect(() => {
    if (chatUser) {
      fetchMessages(chatUser.id);
    }
  }, [fetchMessages, chatUser]);

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
            {messages.map((item) => {
              return (
                <ChatItem user={user} chatUser={chatUser} message={item} />
              );
            })}
          </div>
          <hr style={{ width: '90%' }} />
          <div className="feature-message-chat-operate">
            <TextField
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              style={{ width: 320, margin: '10px 15px 0 25px' }}
            />
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
