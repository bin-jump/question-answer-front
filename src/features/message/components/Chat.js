import React, { useState, useEffect, useCallback, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import {
  useFetchMessages,
  useFetchUnreadMessages,
  useSendMessage,
} from '../redux/hooks';
import { PendIcon, PendButton, Loading } from '../../common';
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

// TODO: add auto message check
export default function Chat(props) {
  const { chatUser, user } = { ...props };
  const [message, setMessage] = useState('');

  const { fetchMessages, chats, fetchMessagePending } = useFetchMessages();
  const { fetchUnreadMessages } = useFetchUnreadMessages();
  const { sendMessage, sendMessagePending } = useSendMessage();

  const messageBottomRef = useRef(null);
  const messageContainerRef = useRef(null);
  const scrollSub = useRef(0);

  const CHECK_INTERVAL = 2000;

  let messages = [];
  let fetchMessageAfter = null;
  let currentChat = null;

  chats.forEach((item) => {
    if (chatUser && chatUser.id === item.withId) {
      messages = item.messages;
      fetchMessageAfter = item.messageAfter;
      currentChat = item;
    }
  });

  const scrollToBottom = useCallback(() => {
    if (messageBottomRef.current) {
      if (scrollSub.current > 10) {
        return;
      }
      messageBottomRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [scrollSub]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, messages]);

  useEffect(() => {
    if (currentChat != null && messages.length === 0) {
      fetchMessages(currentChat.id);
    }
  }, [fetchMessages, currentChat, chatUser, messages]);

  const fetchUnread = useCallback(() => {
    if (currentChat != null) {
      let lastMessage = messages[0];
      if (lastMessage.id === currentChat.coverId) {
        return;
      }
      //console.log('fetchUnread');
      let lastId = lastMessage.id;
      //console.log('unread count', unreadCount, lastMessage);
      fetchUnreadMessages(currentChat.id, lastId);
    }
  }, [fetchUnreadMessages, messages, currentChat]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUnread();
    }, CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchUnread]);

  const sendMsg = () => {
    if (!message) {
      return;
    }
    sendMessage(chatUser.id, { body: message });
    setMessage('');
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {chatUser ? (
        <div>
          <div className="feature-message-chat-head">
            {/* <Button onClick={() => fetchUnread()}>Test</Button> */}
            <Typography style={{ marginTop: 10, fontSize: 18 }}>
              {chatUser.name}
            </Typography>
            {fetchMessagePending && messages.length === 0 ? (
              <Loading style={{ marginTop: 20 }} />
            ) : null}
          </div>
          <hr style={{ width: '80%' }} />
          <div
            className="feature-message-chat-content"
            onScroll={(e) => {
              if (messageContainerRef.current) {
                let element = messageContainerRef.current;
                scrollSub.current =
                  element.scrollHeight -
                  (element.scrollTop + element.clientHeight);
                //console.log('scrollSub: ', scrollSub);
              }
            }}
            ref={messageContainerRef}
          >
            {fetchMessageAfter ? (
              <div style={{ display: 'block', textAlign: 'center' }}>
                <PendIcon
                  onClick={() =>
                    fetchMessages(currentChat.id, fetchMessageAfter)
                  }
                  pending={fetchMessagePending}
                  //disabled={true}
                >
                  <MoreHorizOutlinedIcon />
                </PendIcon>
              </div>
            ) : null}

            {messages
              .slice(0)
              .reverse()
              .map((item) => {
                return (
                  <ChatItem user={user} chatUser={chatUser} message={item} />
                );
              })}
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={messageBottomRef}
            />
          </div>
          <hr style={{ width: '90%' }} />
          <div className="feature-message-chat-operate">
            <TextField
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              style={{ width: 320, margin: '10px 15px 0 25px' }}
            />
            <PendButton
              onClick={() => sendMsg()}
              pending={sendMessagePending}
              variant="outlined"
              style={{ marginTop: 10 }}
            >
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
