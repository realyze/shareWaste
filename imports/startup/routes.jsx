import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import App from '../ui/layouts/App.jsx';
import LoginPage from '../ui/pages/LoginPage.jsx';
import NotFoundPage from '../ui/pages/NotFoundPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={LoginPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Router>
);