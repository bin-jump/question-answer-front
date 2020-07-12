import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './Search.less';

class Search extends Component {
  render() {
    return (
      <div className="header-search">
        <input className="header-search-input" />
        <SearchIcon className="header-search-icon" />
      </div>
    );
  }
}

export default Search;
