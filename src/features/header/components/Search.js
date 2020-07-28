import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import './Search.less';

export default function Search() {
  const [searchWord, setSearchWord] = useState('');
  let history = useHistory();

  const doSearch = () => {
    let word = searchWord.trim();
    if (!word) {
      return;
    }
    let url = `/search?q=${word}`;
    setSearchWord('');
    history.push(url);
  };

  return (
    <div className="header-search">
      <input
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        className="header-search-input"
      />
      <IconButton
        onClick={() => doSearch()}
        style={{ marginLeft: -36, marginBottom: 5, padding: 8 }}
      >
        <SearchIcon style={{ color: 'white' }} />
      </IconButton>
    </div>
  );
}
