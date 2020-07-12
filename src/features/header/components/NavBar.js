import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.less';

class NavBar extends Component {
  render() {
    const { pathname } = this.props;
    console.log(pathname);
    return (
      <div className="header-navBar">
        <ul>
          <li>
            <Link to="/hoe">Home</Link>
          </li>
          <li>
            <Link to="/">News</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
