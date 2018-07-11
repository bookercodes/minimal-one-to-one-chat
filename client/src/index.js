import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router-dom';
import auth from './common/auth';
import history from './common/history';
import Chat from './containers/Chat';
import Authenticate from './containers/Authenticate';
import { injectGlobal } from 'emotion';

injectGlobal`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html, body {height: 100%; overflow: hidden}
  body {
    font-family: -apple-system, BlinkMacSystemFont;
    background-color: #E9EDF6;

  }
  ul{
    list-style: none;
  }
`;

const App = () => (
  <Router history={history}>
    <div>
      <Route
        path="/authenticate"
        render={() =>
          !auth.isAuthorized() ? (
            <Authenticate />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        path="/"
        render={() =>
          auth.isAuthorized() ? (
            <Chat />
          ) : (
            <Redirect to="/authenticate" />
          )
        }
      />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
