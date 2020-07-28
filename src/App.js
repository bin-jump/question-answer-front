import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './common/store';
import history from './common/history';
import Header from './features/header/Header';
import Footer from './features/footer/Footer';
import Home from './features/home/Home';
import QuestionDetail from './features/question/QuestionDetail';
import Profile from './features/profile/Profile';
import PinUser from './features/auth/PinUser';
import Signin from './features/auth/Signin';
import Account from './features/account/Account';
import Message from './features/message/Message';
import Search from './features/search/Search';

import './styles/index.less';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

axios.defaults.baseURL = 'http://localhost:8080';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#33b2dd',
      light: '#43cefe',
    },
    secondary: {
      main: '#9dc8ea',
      light: '#dde6ed',
    },
  },
  status: {
    danger: 'orange',
  },
});

class App extends Component {
  render() {
    return (
      <div>
        <div className="app-container">
          <MuiThemeProvider theme={theme}>
            <Provider store={store}>
              <Router history={history}>
                <Header />
                <PinUser />
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signin} />
                <Route path="/question/:id" exact component={QuestionDetail} />
                <Route path="/profile/:id" component={Profile} />
                <Route path="/account" component={Account} />
                <Route path="/message" exact component={Message} />
                <Route path="/search" exact component={Search} />
              </Router>
              <CssBaseline />
            </Provider>
          </MuiThemeProvider>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
