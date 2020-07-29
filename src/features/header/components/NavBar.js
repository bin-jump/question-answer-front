import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.less';

export default function NavBar(props) {
  const { pathname } = props;

  return (
    <div className="header-navBar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/feed">News</Link>
        </li>
      </ul>
    </div>
  );
}
