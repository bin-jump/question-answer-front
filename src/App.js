import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './common/store';
import history from './common/history';
import Header from './features/header/Header';
import Footer from './features/footer/Footer';
import Home from './features/home/Home';
import PinUser from './features/auth/PinUser';
import './styles/index.less';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <PinUser />
          <Route path="/" component={Home}></Route>
        </Router>
        <Footer />
        <CssBaseline />
      </Provider>
    );
  }
}

export default App;
