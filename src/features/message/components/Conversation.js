import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import './Conversation.less';

export default function Conversation(props) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="feature-message-conversation">
      <div className="feature-message-conversation-search">
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
      <div className="feature-message-converation-users">
        {showSearch ? (
          <div>
            <div style={{ display: 'flex' }}>
              <Typography style={{ margin: '12px 140px 0 10px' }}>
                Search user...
              </Typography>
              <IconButton onClick={() => setShowSearch(false)}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className="feature-message-converation-search-users ">
              User list
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
