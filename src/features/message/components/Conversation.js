import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import CloseIcon from '@material-ui/icons/Close';
import { useFetchChats, useFetchUnreadChats } from '../redux/hooks';
import { milisecToMonDay } from '../../common/helper';
import { LoadableList, Loading } from '../../common';
import './Conversation.less';
import { Button } from '@material-ui/core';

function ChatItem(props) {
  const { chat, selectChatUser, selected } = { ...props };

  return (
    <div className={`feature-message-chat-item-container`}>
      <div
        onClick={() => selectChatUser(chat.withUser)}
        className={`feature-message-chat-item ${
          selected ? 'feature-message-chat-item-selected' : ''
        }`}
      >
        <Avatar
          alt={chat.withUser.name}
          src={chat.withUser.avatarUrl}
          style={{
            border: '1px solid #dce3e8',
            width: 40,
            height: 40,
            marginRight: 8,
          }}
        />
        <div style={{ width: 180 }}>
          <div className="chat-user-name">{chat.withUser.name}</div>
          <div className="chat-cover-text">{chat.coverText}</div>
        </div>

        <div style={{ width: 50 }}>
          <div className="chat-time">{milisecToMonDay(chat.lastTime)}</div>
          <Badge
            style={{ margin: '8px 0 0 15px' }}
            max={99}
            color="primary"
            badgeContent={chat.unreadCount}
          ></Badge>
        </div>
      </div>
      <hr style={{ borderTop: '1px solid #ced7de', width: '90%' }} />
    </div>
  );
}

export default function Conversation(props) {
  const { chatUser, setChatUser } = { ...props };
  const selectedId = chatUser ? chatUser.id : '';

  const [showSearch, setShowSearch] = useState(false);
  const {
    chats,
    fetchChats,
    fetchChatAfter,
    fetchChatPending,
  } = useFetchChats();

  const { fetchUnreadChats, fetchUnreadChatPending } = useFetchUnreadChats();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const selectChatUser = (user) => {
    //console.log(user, chatUser);
    if (chatUser) {
      if (user.id === chatUser.id) {
        setChatUser(null);
      } else {
        setChatUser(user);
      }
    } else {
      setChatUser(user);
    }
  };

  return (
    <div className="feature-message-conversation">
      <div className="feature-message-conversation-search">
        <Button onClick={() => fetchUnreadChats()}>test </Button>
        <TextField
          variant="outlined"
          style={{ width: 320, height: 40 }}
          inputProps={{
            style: {
              height: 40,
              padding: '0 40px 0 15px',
              width: '100%',
            },
          }}
          onSelect={() => setShowSearch(true)}
        />
        <IconButton style={{ marginLeft: -50, marginTop: -5 }}>
          <SearchIcon />
        </IconButton>
      </div>
      <hr style={{ width: '90%', marginBottom: 3 }} />
      <div className="feature-message-converation-users">
        {showSearch ? (
          <div>
            <div style={{ display: 'flex' }}>
              <Typography
                style={{
                  margin: '0 110px 0px 24px',
                  padding: 5,
                  color: '#32b2dd',
                }}
              >
                Search User...
              </Typography>
              <IconButton
                style={{ padding: 3 }}
                onClick={() => setShowSearch(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className="feature-message-converation-list">search</div>
          </div>
        ) : (
          <LoadableList
            hasMore={fetchChatAfter}
            loading={fetchChatPending}
            onLoadClick={() => fetchChats(fetchChatPending)}
            disabled={fetchUnreadChatPending}
          >
            {(fetchChatPending && chats.length === 0) ||
            fetchUnreadChatPending ? (
              <Loading />
            ) : null}
            {chats.map((item) => {
              return (
                <ChatItem
                  chat={item}
                  selected={item.withUser.id === selectedId}
                  selectChatUser={selectChatUser}
                />
              );
            })}
            {chats.length === 0 ? (
              <ContactMailIcon
                style={{
                  marginTop: 60,
                  width: 80,
                  height: 80,
                  color: '#dedede',
                }}
              />
            ) : null}
          </LoadableList>
        )}
      </div>
    </div>
  );
}
