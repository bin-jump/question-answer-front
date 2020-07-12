import React, { Component } from 'react';
import style from './Home.less';

class Home extends Component {
  render() {
    return <div className="feature-home">Home</div>;
  }

  componentDidMount() {
    console.log('Home componentDidMount');
  }
}

export default Home;
